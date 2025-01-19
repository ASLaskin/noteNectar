import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import url from "url";

export async function POST(req: Request) {
  try {
    const { videoId, videoUrl } = await req.json();

    if (!videoId && !videoUrl) {
      return NextResponse.json({ error: "Either video ID or video URL must be provided." }, { status: 400 });
    }

    const finalVideoId = videoUrl
      ? (url.parse(videoUrl, true).query["v"] as string)
      : videoId;

    if (!finalVideoId) {
      return NextResponse.json({ error: "Invalid video ID or URL provided." }, { status: 400 });
    }

    const transcripts = await YoutubeTranscript.fetchTranscript(finalVideoId);

    if (!transcripts || transcripts.length === 0) {
      return NextResponse.json({ error: "No transcripts available for this video." }, { status: 404 });
    }

    const transcriptText = transcripts.map((item) => item.text).join(" ");

    return NextResponse.json({
      videoId: finalVideoId,
      transcript: transcriptText,
      message: "Transcript fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the transcript.", details: error },
      { status: 500 }
    );
  }
}
