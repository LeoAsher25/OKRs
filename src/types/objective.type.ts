export interface ObjectiveDto {
  name: string;
  type: ObjectiveType;
  description: string;
  deadline: Date;
  progress: number;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  keyResults: KeyResultDto[];
}

export type ObjectiveCreateData = Pick<
  ObjectiveDto,
  "name" | "type" | "description" | "deadline"
>;

export enum ObjectiveType {
  BREAKTHROUGH = "BREAKTHROUGH",
  COMMIT = "COMMIT",
}

export interface KeyResultDto {
  name: string;
  description: string;
  deadline: Date;
  progress: number;
  _id?: string;
  createdAt: Date;
  updatedAt: Date;
  commits: CommitDto[];
}

export interface CommitDto {
  message: string;
  progress: number;
  _id: string;
  createdAt: Date;
}
