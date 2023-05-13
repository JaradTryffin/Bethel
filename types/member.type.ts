import { SelectChangeEvent } from "@mui/material/Select";
import { UseFormRegister } from "react-hook-form/dist/types/form";

export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_no: string;
  department: string | undefined;
  zone: string;
}

export interface BasicSelectProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (event: SelectChangeEvent) => void;
  width?: number;
  register?: any;
  errors?: any;
  name?: string;
}

export interface Department {
  value: string;
  label: string;
}

export interface AddMember {
  first_name: string;
  last_name: string;
  address: string;
  email_address?: string;
  contact_no: string;
  date_of_birth: string;
  material_status: string;
  departmentId: string;
  zoneId: string;
}
