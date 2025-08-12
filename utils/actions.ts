"use server";

import prisma from "@/prisma/script";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Prisma } from "@prisma/client";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllSubject = async () => {
  return await prisma.subject.findMany({
    include: { topics: true },
  });
};

export const getAllTopics = async (query: string) => {
  if (!query) {
    return await prisma.topics.findMany({
      include: { subject: true },
      orderBy: { createdAt: "desc" },
    });
  }

  return await prisma.topics.findMany({
    where: {
      title: {
        contains: query.toLowerCase(),
        mode: "insensitive",
      },
    },
    include: { subject: true },
  });
};

export const createTopic = async (formData: FormData) => {
  const title = formData.get("title");
  const short_desc = formData.get("short_desc");
  const long_desc = formData.get("long_desc");
  const subjectId = formData.get("subjectId");
  const tags = formData.get("tags");

  if (typeof tags !== "string" || !tags.trim()) {
    throw new Error("Tags is required and must be a valid string.");
  }

  if (typeof title !== "string" || !title.trim()) {
    throw new Error("Title is required and must be a valid string.");
  }

  if (typeof short_desc !== "string" || !short_desc.trim()) {
    throw new Error(
      "Short description is required and must be a valid string."
    );
  }

  if (typeof long_desc !== "string" || !long_desc.trim()) {
    throw new Error("Long description is required and must be a valid string.");
  }

  if (typeof subjectId !== "string" || !subjectId.trim()) {
    throw new Error("Subject ID is required and must be a valid string.");
  }

  const tagsArray = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  await prisma.topics.create({
    data: {
      title,
      short_desc,
      long_desc,
      tags: tagsArray,
      subjectId,
    },
  });
  revalidatePath("/control/topics");
  redirect("add-topic?success=true");
};

export const updateTopic = async (formData: FormData) => {
  const id = formData.get("id");
  const title = formData.get("title");
  const short_desc = formData.get("short_desc");
  const long_desc = formData.get("long_desc");
  const subjectId = formData.get("subjectId");

  if (typeof title !== "string" || !title.trim()) {
    throw new Error("Title is required and must be a valid string.");
  }

  if (typeof short_desc !== "string" || !short_desc.trim()) {
    throw new Error(
      "Short description is required and must be a valid string."
    );
  }

  if (typeof long_desc !== "string" || !long_desc.trim()) {
    throw new Error("Long description is required and must be a valid string.");
  }

  if (typeof subjectId !== "string" || !subjectId.trim()) {
    throw new Error("Subject ID is required and must be a valid string.");
  }
  if (typeof id !== "string" || !id.trim()) {
    throw new Error("ID is required and must be a valid string.");
  }

  await prisma.topics.update({
    where: {
      id,
    },
    data: {
      title,
      short_desc,
      long_desc,
      subjectId,
    },
  });

  redirect("?success=true");
};

export const getSingleTopic = async (id: string) => {
  return await prisma.topics.findUnique({
    where: {
      id,
    },
    include: { subject: true },
  });
};

export const deleteTopic = async (formData: FormData) => {
  const id = formData.get("id");
  if (typeof id !== "string" || !id.trim()) {
    throw new Error("Id is Required");
  }
  await prisma.topics.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
};

export const createSubject = async (formData: FormData) => {
  const name = formData.get("name");
  const short_desc = formData.get("short_desc");
  const short_name = formData.get("short_name");
  const tags = formData.get("tags");

  if (typeof tags !== "string" || !tags.trim()) {
    throw new Error("Tags is required and must be a valid string.");
  }

  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Name is required and must be a valid string.");
  }

  if (typeof short_name !== "string") {
    throw new Error("Short Name is required and must be a valid string.");
  }

  if (typeof short_desc !== "string") {
    throw new Error("Short Desc is required and must be a valid string.");
  }

  const tagArray = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  await prisma.subject.create({
    data: {
      name,
      short_name,
      short_desc,
      tags: tagArray,
    },
  });
  revalidatePath("/control/subjects");
  redirect("/control/subjects");
};

export const updateSubject = async (formData: FormData) => {
  const id = formData.get("id");
  const name = formData.get("name");
  const short_name = formData.get("short_name");
  const short_desc = formData.get("short_desc");
  const classEl = formData.get("classId") as string;

  if (typeof id !== "string" || !id.trim()) {
    throw new Error("ID is required and must be a valid string.");
  }

  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Name is required and must be a valid string.");
  }

  if (typeof short_name !== "string") {
    throw new Error("Short Name is required and must be a valid string.");
  }

  if (typeof short_desc !== "string") {
    throw new Error("Short Desc is required and must be a valid string.");
  }

  await prisma.subject.update({
    where: {
      id,
    },
    data: {
      name,
      short_name,
      short_desc,
      class: classEl
        ? {
            connect: {
              id: classEl,
            },
          }
        : undefined,
    },
  });

  redirect("?success=true");
};

export const getSinglSubject = async (id: string) => {
  return await prisma.subject.findUnique({
    where: {
      id,
    },
    include: { topics: true, class: true },
  });
};

export const deleteSubject = async (formData: FormData) => {
  const id = formData.get("id");

  if (typeof id !== "string" || !id.trim()) {
    throw new Error("Id is required");
  }

  try {
    await prisma.subject.delete({
      where: {
        id,
      },
    });

    revalidatePath("/control/subjects");
  } catch (error) {
    console.error("Error deleting subject:", error);

    throw new Error(`Failed to delete subject`);
  }
};

export async function createFirstAdmin() {
  const isAlreadyAdmin = await prisma.admin.findFirst();

  if (isAlreadyAdmin) {
    throw new Error("Admin ALready exists.");
  }
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.admin.create({
    data: {
      name: "Admin",
      email: "admin@notes.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  return admin;
}

export const login = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return redirect(
      "/control/login?error=" +
        encodeURIComponent("Email and password are required.")
    );
  }

  if (typeof email !== "string" || !email.trim()) {
    return redirect(
      "/control/login?error=" + encodeURIComponent("Invalid email format.")
    );
  }

  if (typeof password !== "string" || !password.trim()) {
    return redirect(
      "/control/login?error=" + encodeURIComponent("Invalid password format.")
    );
  }

  const user = await prisma.admin.findUnique({ where: { email } });

  if (!user) {
    return redirect(
      "/control/login?error=" + encodeURIComponent("User not found.")
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return redirect(
      "/control/login?error=" + encodeURIComponent("Invalid credentials.")
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ id: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  cookies().set("role", user.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect("/control");
};

export const logout = async () => {
  cookies().delete("token");
  cookies().delete("role");
  redirect("/control/login?error=unauthenticated");
};
export const createGallery = async (formData: FormData) => {
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const text = formData.get("text") as string;

  if (!title || !file) {
    throw new Error("Title and files are required");
  }

  try {
    const imageBuffer = await file.arrayBuffer();
    const imageBuff = Buffer.from(imageBuffer);

    const imageResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "banner/images",
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result)
              return reject(error || new Error("Upload failed"));
            resolve(result);
          }
        );
        stream.end(imageBuff);
      }
    );

    await prisma.gallery.create({
      data: {
        title,
        image: imageResult.secure_url,
        text,
      },
    });
    revalidatePath("/control/gallery");
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Gallery creation failed");
  }
  redirect("/control/gallery/add-gallery?success=true");
};

export const getAllGallery = async () => {
  return await prisma.gallery.findMany({});
  revalidatePath("/");
};

export const getSingleGallery = async (id: string) => {
  return await prisma.gallery.findUnique({
    where: {
      id,
    },
  });
};

export const createComment = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Name, email, and message are required");
  }

  await prisma.contact.create({
    data: {
      name,
      email,
      message,
    },
  });

  redirect("/contact?success=true");
};

export const getAllComments = async () => {
  return await prisma.contact.findMany({});
};

export const deleteComment = async (formData: FormData) => {
  const id = formData.get("id") as string | number;

  await prisma.contact.delete({
    where: {
      id: id as string,
    },
  });

  revalidatePath("/control/contact");
};

export const createPdf = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const tags = formData.get("tags") as string;
    const classEl = formData.get("classId") as string;
    const file = formData.get("file") as File;

    console.log(title, tags, classEl, file);

    if (!title || !classEl) {
      throw new Error("Title and pdf are required");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "pdfs",
          resource_type: "raw",
          transformation: [
            {
              width: 1000,
              height: 1000,
              crop: "limit",
            },
          ],
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Upload failed"));
          }
          resolve(result);
        }
      );

      stream.end(buffer);
    });

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    await prisma.pdf.create({
      data: {
        title,
        url: result.secure_url,
        tags: tagsArray,
        class: classEl
          ? {
              connect: {
                id: classEl,
              },
            }
          : undefined,
      },
    });
  } catch (error: any) {
    console.error("Error creating PDF:", error);

    throw new Error(
      `Failed to create PDF. Error details: ${error.message || error}`
    );
  }

  redirect("/control/pdf");
};

export const incrementPdfLike = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const action = formData.get("like") as string;

  if (!id) {
    throw new Error("Invalid form submission");
  }

  const pdf = await prisma.pdf.findUnique({ where: { id } });
  if (!pdf) throw new Error("pdf not found");

  await prisma.pdf.update({
    where: { id },
    data: {
      like: pdf.like + 1,
    },
  });

  revalidatePath(`/notes-pdf/${id}`);
};

export const getAllPdf = async (query: string, limit: number) => {
  const findOptions: any = {
    take: limit,
    orderBy: {
      download: "asc",
    },
  };

  if (query) {
    findOptions.where = {
      title: {
        contains: query.toLowerCase(),
        mode: "insensitive",
      },
    };
  }

  return await prisma.pdf.findMany(findOptions);
};

export const getSinglePdf = async (id: string) => {
  return await prisma.pdf.findUnique({
    where: { id },
  });
};

export const updateDownloadCount = async (id: string) => {
  const pdf = await prisma.pdf.findUnique({
    where: { id },
    select: { download: true },
  });

  if (!pdf) {
    console.error("PDF not found");
    return;
  }

  const updatedPdf = await prisma.pdf.update({
    where: { id },
    data: {
      download: pdf.download + 1,
    },
  });

  revalidatePath("/notes-pdf");

  return updatedPdf;
};

export const deletePdf = async (formData: FormData) => {
  const id = formData.get("id") as string | number;

  await prisma.pdf.delete({
    where: {
      id: id as string,
    },
  });

  revalidatePath("/control/pdf");
};

export const createScheme = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const short_desc = formData.get("short_desc") as string;
    const tags = formData.get("tags") as string;
    const classEl = formData.get("class") as string;
    const file = formData.get("url") as File;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!title || !file || !short_desc || !tags || !classEl) {
      throw new Error("please fill out all fields.");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "pdfs",
          resource_type: "raw",
          transformation: [
            {
              width: 1000,
              height: 1000,
              crop: "limit",
            },
          ],
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Upload failed"));
          }
          resolve(result);
        }
      );

      stream.end(buffer);
    });

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    await prisma.scheme.create({
      data: {
        title,
        short_desc,
        tags: tagsArray,
        class: classEl
          ? {
              connect: {
                id: classEl,
              },
            }
          : undefined,
        url: result.secure_url,
      },
    });
  } catch (error: any) {
    console.error("Error creating PDF:", error);

    throw new Error(
      `Failed to create PDF. Error details: ${error.message || error}`
    );
  }

  redirect("/control/scheme");
};

export const getAllScheme = async () => {
  return await prisma.scheme.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { class: true },
  });
};

export const getSingleScheme = async (id: string) => {
  return await prisma.scheme.findUnique({
    where: {
      id,
    },
    include: {
      class: {
        include: {
          pdfs: true,
        },
      },
    },
  });
};

export const deleteScheme = async (formData: FormData) => {
  const id = formData.get("id");
  if (typeof id !== "string" || !id.trim()) {
    throw new Error("Id is Required");
  }
  await prisma.scheme.delete({
    where: {
      id,
    },
  });
  revalidatePath("/control/scheme");
};

export const deleteGallery = async (formData: FormData) => {
  const id = formData.get("id") as string | number;
  await prisma.gallery.delete({
    where: {
      id: id as string,
    },
  });

  revalidatePath("/control/gallery");
};

export const createReview = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const content = formData.get("content") as string;
  const rating = parseInt(formData.get("rating") as string);
  const schemeId = formData.get("schemeId") as string;

  if (!name || !email || !content || !rating || !schemeId) {
    throw new Error("Missing required fields");
  }

  await prisma.review.create({
    data: {
      name,
      email,
      content,
      rating,
      schemeId,
    },
  });

  revalidatePath(`/scheme/${schemeId}`);
};

export const getSchemeReview = async (id: string) => {
  return await prisma.review.findMany({
    where: {
      schemeId: id,
    },
  });
};

export const getAverageSchemeReview = async (id: string) => {
  const result = await prisma.review.aggregate({
    where: {
      schemeId: id,
    },
    _avg: {
      rating: true,
    },
  });

  return result._avg.rating ?? 0;
};

export const deleteAllReview = async () => {
  await prisma.review.deleteMany({});
};

export const subscribeEmail = async (formData: FormData) => {
  const email = formData.get("email") as string;
  if (!email) {
    throw new Error("Email must be provided.");
  }

  return await prisma.newsLetter.create({
    data: {
      email,
    },
  });
};
export const updateScheme = async (formData: FormData) => {
  const schemeId = formData.get("schemeId") as string;
  const title = formData.get("title") as string;
  const existingFile = formData.get("existingFile") as string;
  const newFile = formData.get("url") as File;
  const classEl = formData.get("classId") as string;

  const isValidNewFile = newFile && newFile.size > 0;

  if (!schemeId || !title || (!existingFile && !newFile)) {
    throw new Error("Scheme ID, title, and a PDF file are required");
  }

  const scheme = await prisma.scheme.findUnique({ where: { id: schemeId } });
  if (!scheme) throw new Error("Scheme not found");

  let uploadedFileUrl = existingFile;

  if (isValidNewFile) {
    const buffer = Buffer.from(await newFile.arrayBuffer());

    const uploaded = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "pdfs",
            resource_type: "raw",
            format: "pdf",
          },
          (error, result) => {
            if (error || !result) reject(error || new Error("Upload failed"));
            else
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
          }
        )
        .end(buffer);
    });

    uploadedFileUrl = uploaded.secure_url;
  }

  await prisma.scheme.update({
    where: { id: schemeId },
    data: {
      title,
      url: uploadedFileUrl ? uploadedFileUrl : existingFile,
      class: classEl
        ? {
            connect: {
              id: classEl,
            },
          }
        : undefined,
    },
  });

  redirect("/control/scheme");
};

export const getClass = async () => {
  return await prisma.class.findMany({});
};

export const getSingleClass = async (id: string) => {
  return await prisma.class.findUnique({
    where: { slug: id },
    include: { subject: true, pdfs: true, schemes: true },
  });
};

export const createUser = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return redirect(
      "/login?error=" + encodeURIComponent("User Already Exists. Login")
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  redirect('/login?success="User Created! Login Now');
};

export const userLogin = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return redirect(
      "/login?error=" + encodeURIComponent("Email and password are required.")
    );
  }

  if (typeof email !== "string" || !email.trim()) {
    return redirect(
      "/login?error=" + encodeURIComponent("Invalid email format.")
    );
  }

  if (typeof password !== "string" || !password.trim()) {
    return redirect(
      "/login?error=" + encodeURIComponent("Invalid password format.")
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return redirect("/login?error=" + encodeURIComponent("User not found."));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return redirect(
      "/login?error=" + encodeURIComponent("Invalid credentials.")
    );
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ id: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set("userToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
  });

  cookieStore.set("name", user.name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
  });

  return redirect(`/`);
};

export const userLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("userToken");

  revalidatePath(`/`);
  return redirect("/");
};

export async function searchAll(query: string) {
  if (!query) return { subjects: [], grades: [], pdfs: [], schemes: [] };

  const search: Prisma.StringFilter = {
    contains: query,
    mode: "insensitive",
  };

  const [subjects, grades, pdfs, schemes] = await Promise.all([
    prisma.subject.findMany({
      where: { name: search },
    }),
    prisma.class.findMany({
      where: {
        OR: [{ title: search }],
      },
    }),
    prisma.pdf.findMany({
      where: {
        OR: [{ title: search }, { tags: { has: query } }],
      },
    }),
    prisma.scheme.findMany({
      where: {
        OR: [{ title: search }, { short_desc: search }],
      },
    }),
  ]);

  return {
    subjects,
    grades,
    pdfs,
    schemes,
  };
}

export const updateGrade = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const short_desc = formData.get("short_desc") as string;
  const long_desc = formData.get("long_desc") as string;

  await prisma.class.update({
    data: {
      title,
      short_desc,
      long_desc,
    },
    where: {
      id,
    },
  });

  redirect(`/control/grades/${slug}/?success=true`);
};
