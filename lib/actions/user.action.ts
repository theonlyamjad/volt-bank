"use server" 
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { generateToken, verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { SignInParams, SignUpParams } from "@/types";

const COOKIE_NAME = "auth-token";
const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const signUp = async (userData: SignUpParams) => {
  const { firstName, lastName, email, password } = userData;
  try {
    console.log('🔵 Starting signUp with:', { email, firstName, lastName });

    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ emails: email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    console.log('✅ Email is available');

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      emails: email,
      password,
      address1: userData.address1 || "",
      city: userData.city || "",
      state: userData.state || "",
      postalCode: userData.postalCode || "",
      dateOfBirth: userData.dateOfBirth || "",
      ssn: userData.ssn || "",
      userId: "",
      dwollaCustomerId: "",
      dwollaCustomerUrl: "",
    });

    console.log('✅ User created in MongoDB:', newUser._id);

    // Generate JWT token
    const token = generateToken(newUser);
    console.log('✅ JWT token generated');

    // Set auth cookie
    (await cookies()).set(COOKIE_NAME, token, COOKIE_OPTIONS);
    console.log('✅ Auth cookie set');

    return parseStringify({
      success: true,
      user: {
        _id: newUser._id,
        emails: newUser.emails,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address1: newUser.address1,
        city: newUser.city,
        state: newUser.state,
        postalCode: newUser.postalCode,
        dateOfBirth: newUser.dateOfBirth,
        ssn: newUser.ssn,
      },
    });

  } catch (error) {
    console.error('❌ Sign Up Error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
}

export const signIn = async (userData: SignInParams) => {
  const { email, password } = userData;
  try {
    console.log('🔵 Starting signIn with email:', email);

    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Find user by email
    const user = await User.findOne({ emails: email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    console.log('✅ User found');

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    console.log('✅ Password verified');

    // Generate JWT token
    const token = generateToken(user);
    console.log('✅ JWT token generated');

    // Set auth cookie
    (await cookies()).set(COOKIE_NAME, token, COOKIE_OPTIONS);
    console.log('✅ Auth cookie set');

    return parseStringify({
      success: true,
      user: {
        _id: user._id,
        emails: user.emails,
        firstName: user.firstName,
        lastName: user.lastName,
        address1: user.address1,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        dateOfBirth: user.dateOfBirth,
        ssn: user.ssn,
      },
    });

  } catch (error) {
    console.error('❌ Sign In Error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
}

export async function getLoggedInUser() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME);

    if (!token || !token.value) {
      return null;
    }

    // Verify token
    const decoded = verifyToken(token.value);
    if (!decoded) {
      return null;
    }

    // Fetch user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return null;
    }

    console.log('✅ Logged in user fetched');

    return parseStringify({
      _id: user._id,
      emails: user.emails,
      firstName: user.firstName,
      lastName: user.lastName,
      address1: user.address1,
      city: user.city,
      state: user.state,
      postalCode: user.postalCode,
      dateOfBirth: user.dateOfBirth,
      ssn: user.ssn,
      dwollaCustomerId: user.dwollaCustomerId,
      dwollaCustomerUrl: user.dwollaCustomerUrl,
    });

  } catch (error) {
    console.error('❌ Get Logged In User Error:', error);
    return null;
  }
}

export async function logoutAccount() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    console.log('✅ User logged out');
    return { success: true };
  } catch (error) {
    console.error('❌ Logout Error:', error);
    throw error;
  }
}