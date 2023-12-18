export default class ResponsePostDto {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
