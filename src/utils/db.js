import { db } from "./firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc,
  increment as firestoreIncrement,
  deleteDoc,
} from "firebase/firestore"
import "firebase/compat/firestore"

// User related functions
export async function createUser(uid, data) {
  try {
    // Check if user already exists
    const userRef = doc(db, "users", uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      // User already exists, update only if needed
      return userSnap.data()
    }

    // Create new user
    await setDoc(userRef, {
      ...data,
      createdAt: Timestamp.now(),
    })

    return data
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function getUser(uid) {
  try {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting user:", error)
    throw error
  }
}

export async function updateUser(uid, data) {
  try {
    const userRef = doc(db, "users", uid)
    await updateDoc(userRef, {
      ...data,
      updatedAt: Timestamp.now(),
    })

    return { id: uid, ...data }
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

// Workout related functions
export async function createWorkout(uid, workoutData) {
  try {
    const workoutRef = collection(db, "workouts")
    const docRef = await addDoc(workoutRef, {
      userId: uid,
      ...workoutData,
      createdAt: Timestamp.now(),
    })

    // Update user stats
    await updateUserStats(uid, {
      workoutsCompleted: firestoreIncrement(1),
    })

    return { id: docRef.id, ...workoutData }
  } catch (error) {
    console.error("Error creating workout:", error)
    throw error
  }
}

export async function getUserWorkouts(uid) {
  try {
    const workoutsRef = collection(db, "workouts")
    const q = query(workoutsRef, where("userId", "==", uid), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)
    const workouts = []

    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() })
    })

    return workouts
  } catch (error) {
    console.error("Error getting user workouts:", error)
    throw error
  }
}

export async function getRecentWorkouts(uid, count = 5) {
  try {
    const workoutsRef = collection(db, "workouts")
    const q = query(workoutsRef, where("userId", "==", uid), orderBy("createdAt", "desc"), limit(count))

    const querySnapshot = await getDocs(q)
    const workouts = []

    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() })
    })

    return workouts
  } catch (error) {
    console.error("Error getting recent workouts:", error)
    throw error
  }
}

// Exercise tracking functions
export async function logExercise(uid, workoutId, exerciseData) {
  try {
    const exerciseRef = collection(db, "exercises")
    const docRef = await addDoc(exerciseRef, {
      userId: uid,
      workoutId,
      ...exerciseData,
      completedAt: Timestamp.now(),
    })

    return { id: docRef.id, ...exerciseData }
  } catch (error) {
    console.error("Error logging exercise:", error)
    throw error
  }
}

export async function getWorkoutExercises(workoutId) {
  try {
    const exercisesRef = collection(db, "exercises")
    const q = query(exercisesRef, where("workoutId", "==", workoutId), orderBy("completedAt", "asc"))

    const querySnapshot = await getDocs(q)
    const exercises = []

    querySnapshot.forEach((doc) => {
      exercises.push({ id: doc.id, ...doc.data() })
    })

    return exercises
  } catch (error) {
    console.error("Error getting workout exercises:", error)
    throw error
  }
}

export async function getUserStats(uid) {
  try {
    const statsRef = doc(db, "stats", uid)
    const docSnap = await getDoc(statsRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      // Initialize stats if they don't exist
      const initialStats = {
        numberofMusclesHitted: 0,
        exercisesDone: 0,
        totalSets: 0,
        totalTime: 0,
        muscleGroups: {},
        updatedAt: Timestamp.now(),
      }

      await setDoc(statsRef, initialStats)
      return { id: uid, ...initialStats }
    }
  } catch (error) {
    console.error("Error getting user stats:", error)
    throw error
  }
}

export async function updateUserStats(uid, statsData, muscleGroupsData = null) {
  try {
    const statsRef = doc(db, "stats", uid)
    const docSnap = await getDoc(statsRef)

    if (docSnap.exists()) {
      // Update existing stats
      const updateData = {}

      // Use Firestore increment for numerical values
      if (statsData.exercisesDone) {
        updateData.exercisesDone = firestoreIncrement(statsData.exercisesDone)
      }

      if (statsData.totalSets) {
        updateData.totalSets = firestoreIncrement(statsData.totalSets)
      }

      if (statsData.totalTime) {
        updateData.totalTime = firestoreIncrement(statsData.totalTime)
      }

      updateData.updatedAt = Timestamp.now()

      // If we have muscle group data to update
      if (muscleGroupsData) {
        const currentStats = docSnap.data()
        const currentMuscleGroups = currentStats.muscleGroups || {}
        const updatedMuscleGroups = { ...currentMuscleGroups }

        // Update each muscle group
        for (const [muscle, data] of Object.entries(muscleGroupsData)) {
          if (!updatedMuscleGroups[muscle]) {
            updatedMuscleGroups[muscle] = { sets: 0, time: 0 }
          }

          // Add sets and time to this muscle group
          updatedMuscleGroups[muscle].sets = (updatedMuscleGroups[muscle].sets || 0) + data.sets
          updatedMuscleGroups[muscle].time = (updatedMuscleGroups[muscle].time || 0) + data.time
        }

        // Count unique muscle groups hit
        updateData.numberofMusclesHitted = Object.keys(updatedMuscleGroups).length

        // Update the muscle groups data
        updateData.muscleGroups = updatedMuscleGroups
      }

      // Update the document
      await updateDoc(statsRef, updateData)
    } else {
      // Create new stats document
      const initialStats = {
        numberofMusclesHitted: 0,
        exercisesDone: statsData.exercisesDone || 0,
        totalSets: statsData.totalSets || 0,
        totalTime: statsData.totalTime || 0,
        muscleGroups: {},
        updatedAt: Timestamp.now(),
      }

      // If we have muscle group data
      if (muscleGroupsData) {
        const muscleGroups = {}

        // Initialize each muscle group
        for (const [muscle, data] of Object.entries(muscleGroupsData)) {
          muscleGroups[muscle] = {
            sets: data.sets || 0,
            time: data.time || 0,
          }
        }

        initialStats.muscleGroups = muscleGroups
        initialStats.numberofMusclesHitted = Object.keys(muscleGroups).length
      }

      await setDoc(statsRef, initialStats)
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating user stats:", error)
    throw error
  }
}

// Workout Schedule functions
export async function hasScheduledWorkouts(uid) {
  try {
    const schedulesRef = collection(db, "workout_schedules")
    const q = query(schedulesRef, where("userId", "==", uid))
    const querySnapshot = await getDocs(q)

    return !querySnapshot.empty
  } catch (error) {
    console.error("Error checking scheduled workouts:", error)
    return false
  }
}

export async function getScheduledWorkouts(uid) {
  try {
    const schedulesRef = collection(db, "workout_schedules")
    const q = query(schedulesRef, where("userId", "==", uid), orderBy("dayIndex", "asc"))

    const querySnapshot = await getDocs(q)
    const schedules = []

    querySnapshot.forEach((doc) => {
      schedules.push({ id: doc.id, ...doc.data() })
    })

    return schedules
  } catch (error) {
    console.error("Error getting scheduled workouts:", error)
    throw error
  }
}

export async function saveWorkoutSchedule(uid, scheduleData) {
  try {
    const schedulesRef = collection(db, "workout_schedules")

    // First, delete any existing schedules for this user
    const existingSchedules = await getScheduledWorkouts(uid)
    for (const schedule of existingSchedules) {
      await deleteDoc(doc(db, "workout_schedules", schedule.id))
    }

    // Then save the new schedules
    const savedSchedules = []

    for (const daySchedule of scheduleData) {
      const docRef = await addDoc(schedulesRef, {
        userId: uid,
        ...daySchedule,
        createdAt: Timestamp.now(),
      })

      savedSchedules.push({ id: docRef.id, ...daySchedule })
    }

    return savedSchedules
  } catch (error) {
    console.error("Error saving workout schedule:", error)
    throw error
  }
}

export async function getWorkoutHistoryFromSchedule(uid) {
  try {
    // Get current date
    const today = new Date()
    const currentDayIndex = today.getDay() // 0 = Sunday, 1 = Monday, etc.

    // Get all scheduled workouts
    const schedules = await getScheduledWorkouts(uid)

    // Filter to only include workouts that would have happened before today
    const pastWorkouts = schedules
      .filter((schedule) => schedule.dayIndex < currentDayIndex)
      .map((schedule) => {
        // Calculate the date this workout would have happened
        const workoutDate = new Date(today)
        workoutDate.setDate(today.getDate() - (currentDayIndex - schedule.dayIndex))

        return {
          id: schedule.id,
          date: workoutDate.toISOString().split("T")[0],
          type: schedule.workoutType,
          day: schedule.day,
          time: schedule.time,
        }
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, most recent first

    return pastWorkouts
  } catch (error) {
    console.error("Error getting workout history from schedule:", error)
    throw error
  }
}
