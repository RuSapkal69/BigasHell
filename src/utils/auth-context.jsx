"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth"
import { auth } from "./firebase"
import { createUser } from "./db"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const signUp = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update the user profile with the name
      await updateProfile(userCredential.user, {
        displayName: name,
      })

      // Create user document in database
      await createUser(userCredential.user.uid, {
        name,
        email,
        createdAt: new Date(),
        profileComplete: false,
      })

      console.log("User created:", userCredential.user)
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)

      // Check if this is a new user and create profile if needed
      try {
        await createUser(userCredential.user.uid, {
          name: userCredential.user.displayName || "",
          email: userCredential.user.email,
          createdAt: new Date(),
          profileComplete: false,
        })
      } catch (error) {
        // User might already exist, ignore error
        console.log("User might already exist:", error)
      }
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)

      // Check if this is a new user and create profile if needed
      try {
        await createUser(userCredential.user.uid, {
          name: userCredential.user.displayName || "",
          email: userCredential.user.email,
          createdAt: new Date(),
          profileComplete: false,
        })
      } catch (error) {
        // User might already exist, ignore error
        console.log("User might already exist:", error)
      }
    } catch (error) {
      console.error("Error signing in with Facebook:", error)
      throw error
    }
  }

  const signInWithTwitter = async () => {
    try {
      const provider = new TwitterAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)

      // Check if this is a new user and create profile if needed
      try {
        await createUser(userCredential.user.uid, {
          name: userCredential.user.displayName || "",
          email: userCredential.user.email,
          createdAt: new Date(),
          profileComplete: false,
        })
      } catch (error) {
        // User might already exist, ignore error
        console.log("User might already exist:", error)
      }
    } catch (error) {
      console.error("Error signing in with Twitter:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithFacebook,
        signInWithTwitter,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
