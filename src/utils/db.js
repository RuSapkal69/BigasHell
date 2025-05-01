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
  increment,
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
      workoutsCompleted: increment(1),
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

    // Update user stats
    await updateUserStats(uid, {
      exercisesDone: increment(1),
      totalSets: increment(exerciseData.sets || 1),
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
        workoutsCompleted: 0,
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

export async function updateUserStats(uid, statsData) {
  try {
    const statsRef = doc(db, "stats", uid)
    await updateDoc(statsRef, {
      ...statsData,
      updatedAt: Timestamp.now(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating user stats:", error)
    throw error
  }
}
