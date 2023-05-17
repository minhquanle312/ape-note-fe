export interface CreateNote {
  title?: string;
  content?: string;
  isPin?: boolean;
}

export interface Note {
  title?: string;
  content?: string;
  isPin?: boolean;
}

export interface ObservableError {
  error: {
    error: string;
    message: string;
    statusCode: number;
  };
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
}

export enum NoteType {
  owner = 'currentUserNote',
  shared = 'sharedWithMe',
}
