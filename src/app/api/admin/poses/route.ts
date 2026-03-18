import { PosesDB } from '@/lib/db-robust';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const poses = await PosesDB.read();
    return Response.json(poses);
  } catch (error) {
    return Response.json({ error: 'Failed to read poses database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPose = await request.json();
    const success = await PosesDB.addPose(newPose);
    
    if (!success) {
      return Response.json({ error: 'Pose already exists or write failed' }, { status: 400 });
    }
    
    return Response.json(newPose, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Failed to add pose' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
    try {
      const updatedPose = await request.json();
      const success = await PosesDB.updatePose(updatedPose);
      
      if (!success) {
        return Response.json({ error: 'Pose not found or write failed' }, { status: 404 });
      }
  
      return Response.json(updatedPose);
    } catch (error) {
      return Response.json({ error: 'Failed to update pose' }, { status: 500 });
    }
}
