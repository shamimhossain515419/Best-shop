import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";

export async function GET(req) {

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


          const getData = await Product.find({ category: id });

          if (getData) {
               return NextResponse.json({
                    success: true,
                    data: getData,
               });
          } else {
               return NextResponse.json({
                    success: false, status: 204,
                    message: "Failed to delete the product ! Please try again",
               });
          }



     } catch (e) {
          return NextResponse.json({
               success: false,
               message: "Failed to update the product ! Please try again later",
          })
     }


}