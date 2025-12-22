const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8787";

export interface Drive {
    id: number;
    title: string;
    organization: string;
    description: string;
    currentAmount: number;
    targetAmount?: number;
    imageUrl: string;
    endDate?: string;
    gallery?: string[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface DrivesResponse {
    drives: Drive[];
}

// Fetch drives from the API
export async function fetchDrives(params?: {
    status?: string;
    q?: string;
    skip?: number;
    take?: number;
}): Promise<DrivesResponse> {
    const searchParams = new URLSearchParams();

    if (params?.status) {
        searchParams.append("status", params.status);
      }
    if (params?.q) {
        searchParams.append("q", params.q);
      }
    if (params?.skip !== undefined) {
        searchParams.append("skip", params.skip.toString());
      }
    if (params?.take !== undefined) {
        searchParams.append("take", params.take.toString());
      }

    const url = `${API_URL}/drives${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch drives: ${response.statusText} (${response.status})`);
        }

        return await response.json();
    } catch (error) {
        // Handle network errors (server not running, CORS, etc.)
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error(
                `Unable to connect to the API server at ${API_URL}. ` +
                `Please ensure the backend server is running. ` +
                `If you're using a Cloudflare Worker, run 'npm run dev' in the worker directory.`
            );
        }
        throw error;
    }
}

// Fetch a single drive by ID
export interface DriveResponse {
    drive: Drive;
  }

export async function fetchDriveById(id: number): Promise<DriveResponse> {
    const url = `${API_URL}/drives/${id}`;
    
    try {
        const response = await fetch(url);
    
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Drive not found");
            }
            throw new Error(`Failed to fetch drive: ${response.statusText} (${response.status})`);
        }
    
        return await response.json();
    } catch (error) {
        // Handle network errors (server not running, CORS, etc.)
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error(
                `Unable to connect to the API server at ${API_URL}. ` +
                `Please ensure the backend server is running. ` +
                `If you're using a Cloudflare Worker, run 'npm run dev' in the worker directory.`
            );
        }
        throw error;
    }
  }

  export function transformDrive(apiDrive: Drive): {
    driveId: number;
    title: string;
    organization: string;
    description: string;
    currentAmount: number;
    targetAmount?: number;
    imageUrl: string;
    endDate?: string;
    gallery?: string[];
  } {
    return {
      driveId: apiDrive.id,
      title: apiDrive.title,
      organization: apiDrive.organization,
      description: apiDrive.description,
      currentAmount: apiDrive.currentAmount || 0,
      targetAmount: apiDrive.targetAmount || undefined,
      imageUrl: apiDrive.imageUrl,
      endDate: apiDrive.endDate || undefined,
      gallery: apiDrive.gallery || undefined,
    };
  }