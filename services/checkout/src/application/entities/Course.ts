import crypto from 'node:crypto'

export class Course {
  constructor(
    readonly courseId: string,
    readonly title: string,
    readonly amount: number
  ) {}
}