/**
 * Setup script to create initial admin user
 * 
 * This script helps create the first admin user for the system.
 * Run with: npx tsx scripts/setup-admin.ts
 */

import { config } from 'dotenv';
import { db } from '../src/db/drizzle';
import { user } from '../src/db/auth-schema';
import { eq } from 'drizzle-orm';
import { generateId } from "better-auth";
import { hashPassword } from "better-auth/crypto";

config({ path: '.env.local' });

async function createAdminUser() {
  const email = process.argv[2];
  const name = process.argv[3];
  const password = process.argv[4];

  if (!email || !name || !password) {
    console.error("Usage: npx tsx scripts/setup-admin.ts <email> <name> <password>");
    console.error("Example: npx tsx scripts/setup-admin.ts admin@example.com 'Admin User' 'secure-password'");
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      console.log(`User with email ${email} already exists.`);
      
      // Update to admin role if not already
      if (existingUser[0].role !== "admin") {
        await db
          .update(user)
          .set({ role: "admin" })
          .where(eq(user.email, email));
        console.log(`Updated ${email} to admin role.`);
      } else {
        console.log(`${email} is already an admin.`);
      }
      return;
    }

    // Create new admin user
    const userId = generateId();
    const hashedPassword = await hashPassword(password);

    await db.insert(user).values({
      id: userId,
      email,
      name,
      role: "admin",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Note: We're not storing the password in the user table directly
    // Better Auth handles password storage in the account table
    // For now, the admin will need to use the "forgot password" flow
    // or you can manually create an account record

    console.log(`✅ Admin user created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Name: ${name}`);
    console.log(`Role: admin`);
    console.log(`User ID: ${userId}`);
    console.log(`\n⚠️  Important: The user will need to complete email verification and set up their password through the sign-in flow.`);
    console.log(`\n💡 Tip: Add this user ID to your ADMIN_USER_IDS environment variable: ${userId}`);

  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser().then(() => process.exit(0));