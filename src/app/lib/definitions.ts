export type BlogPostRow = {
    headerimage: string,
    tags: string[],
    blockorder: number,
    islive: boolean,
    blogdate: Date,
    blogid: number,
    blockcontent: string,
    blogtitle: string
}

export type BlogPostRowWithType = BlogPostRow & {
    blocktype: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};