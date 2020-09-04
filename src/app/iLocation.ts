
export interface Location {
    success: boolean;
    error: {
        code: string,
        description: string
    };
    response: {
        loc: {
            long: number,
            lat: number
        };
        place: {
            city: string,
            state: string
        }
    };    
  }