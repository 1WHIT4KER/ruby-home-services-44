export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_invitations: {
        Row: {
          created_at: string | null
          created_by: string | null
          email: string
          expires_at: string | null
          id: string
          status: string | null
          token: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          email: string
          expires_at?: string | null
          id?: string
          status?: string | null
          token?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          status?: string | null
          token?: string | null
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          auto_assign_leads: boolean | null
          created_at: string | null
          default_quote_expiry: number | null
          email_notifications: boolean | null
          id: string
          updated_at: string | null
        }
        Insert: {
          auto_assign_leads?: boolean | null
          created_at?: string | null
          default_quote_expiry?: number | null
          email_notifications?: boolean | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          auto_assign_leads?: boolean | null
          created_at?: string | null
          default_quote_expiry?: number | null
          email_notifications?: boolean | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          address: string
          appointment_date: string | null
          created_at: string
          email: string
          exterior_power_washing: boolean | null
          first_name: string
          gutter_cleaning: boolean | null
          id: string
          last_name: string
          notes: string | null
          payment_method: string | null
          phone: string
          screen_cleaning: boolean | null
          selected_contract: string | null
          status: string
          viewed_at: string | null
          wants_instant_quote: boolean | null
          wants_review_discount: boolean | null
        }
        Insert: {
          address: string
          appointment_date?: string | null
          created_at?: string
          email: string
          exterior_power_washing?: boolean | null
          first_name: string
          gutter_cleaning?: boolean | null
          id?: string
          last_name: string
          notes?: string | null
          payment_method?: string | null
          phone: string
          screen_cleaning?: boolean | null
          selected_contract?: string | null
          status?: string
          viewed_at?: string | null
          wants_instant_quote?: boolean | null
          wants_review_discount?: boolean | null
        }
        Update: {
          address?: string
          appointment_date?: string | null
          created_at?: string
          email?: string
          exterior_power_washing?: boolean | null
          first_name?: string
          gutter_cleaning?: boolean | null
          id?: string
          last_name?: string
          notes?: string | null
          payment_method?: string | null
          phone?: string
          screen_cleaning?: boolean | null
          selected_contract?: string | null
          status?: string
          viewed_at?: string | null
          wants_instant_quote?: boolean | null
          wants_review_discount?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
