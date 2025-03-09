export interface TableOfContentsInterface {
  id?: string;
  title: string;
  level: number;
  children: TableOfContentsInterface[];
}
