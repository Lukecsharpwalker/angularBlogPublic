// export type Json =
//   | string
//   | number
//   | boolean
//   | null
//   | { [key: string]: Json | undefined }
//   | Json[]
//
// export type Database = {
//   public: {
//     Tables: {
//       comments: {
//         Row: CommentRow
//         Insert: CommentInsert
//         Update: CommentUpdate
//         Relationships: CommentRelationships
//       }
//       post_tags: {
//         Row: PostTagRow
//         Insert: PostTagInsert
//         Update: PostTagUpdate
//         Relationships: PostTagRelationships
//       }
//       posts: {
//         Row: PostRow
//         Insert: PostInsert
//         Update: PostUpdate
//         Relationships: PostRelationships
//       }
//       profiles: {
//         Row: ProfileRow
//         Insert: ProfileInsert
//         Update: ProfileUpdate
//         Relationships: ProfileRelationships
//       }
//       tags: {
//         Row: TagRow
//         Insert: TagInsert
//         Update: TagUpdate
//         Relationships: TagRelationships
//       }
//     }
//     Views: {
//       [_ in never]: never
//     }
//     Functions: {
//       [_ in never]: never
//     }
//     Enums: {
//       [_ in never]: never
//     }
//     CompositeTypes: {
//       [_ in never]: never
//     }
//   }
// }
//
// export type DefaultSchema = Database[Extract<keyof Database, "public">]
