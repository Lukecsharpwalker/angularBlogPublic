export type Profile = {
  avatar_url: string | null
  created_at: string | null
  id: string
  username: string
}

export type ProfileInsert = {
  avatar_url?: string | null
  created_at?: string | null
  id: string
  username: string
}

export type ProfileUpdate = {
  avatar_url?: string | null
  created_at?: string | null
  id?: string
  username?: string
}

export type ProfileRelationships = []
