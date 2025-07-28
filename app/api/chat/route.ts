import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import systemPrompt from '../../../aiAssistantConstants/systemPrompt';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const textStream  = streamText({
    model: openai('gpt-3.5-turbo'),
    messages,
    system: systemPrompt
  });
  return textStream.toDataStreamResponse();
}