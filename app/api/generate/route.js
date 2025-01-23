import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("urlshorten");
    const collection = db.collection("url");
     const doc = await collection.findOne({ shorturl: body.shorturl });
     if (doc) {
       return Response.json({
         success: false,
         error: true,
         message: "URL already exists!",
       });
     }

    // Insert the document into the database
    const result = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
    });

    // Return a successful response
    return new Response(
      JSON.stringify({
        success: true,
        error: false,
        message: "URL Generated Successfully",
        data: result,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Handle errors
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: "An error occurred",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
