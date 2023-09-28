import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "farce-dynamic";

export async function DELETE(req) {


     const isUser=AuthUser(req);
    

     try {
          await connectToDB();
          const { searchParams } = new URL(req.url);
          const id = searchParams.get("id");
          if (!id) {
               return NextResponse.json({
                    success: false,
                    message: "Product ID is required",
               })
          }
          const deleteProduct = await Product.findByIdAndDelete(id);

          if (deleteProduct) {
               return NextResponse.json({
                    success: true,
                    message: "Product delete successfully"
               });
          } else {
               return NextResponse.json({
                    success: false,
                    message: "Failed to delete the product ! Please try again",
               });
          }


     } catch (error) {
          return NextResponse, json({
               success: false,
               message: " Product delete successfully"
          })
     }

}