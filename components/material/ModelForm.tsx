"use client";
import { Button } from "@tremor/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Typography, Modal, Box, TextField } from "@mui/material";
import { Divider } from "@tremor/react";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BasicSelect from "@/components/material/DropDown";
import { SelectChangeEvent } from "@mui/material/Select";
import { Department } from "@/types/member.type";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { Inputs } from "preact/compat";
import axios from "axios";

export default function ModelForm({
  department,
  zones,
}: {
  department: Department[];
  zones: Department[];
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [status, setStatus] = useState("single");
  const [departmentDropDown, setDepartmentDropDown] = useState("");
  const [zoneDropDown, setZoneDropDown] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const { field } = useController({
    name: "date_of_birth",
    control,
    defaultValue: "",
  });

  const onSubmit: SubmitHandler<Inputs | any> = async (data) => {
    const formData = {
      ...data,
      date_of_birth: dayjs(data.date_of_birth),
    };
    await axios.post("/api/members", formData, {}).then(function (response) {
      console.log(response);
    });
    
  };

  const handleModel = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button
        icon={UserPlusIcon}
        className="h-12"
        size="xs"
        onClick={handleModel}
      >
        New Member
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Member
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
            >
              <TextField
                sx={{ width: 300 }}
                id="filled-basic"
                label="First Name"
                variant="filled"
                {...register("first_name")}
              />
              <TextField
                id="filled-basic"
                label="Surname"
                variant="filled"
                {...register("last_name")}
              />
            </Box>
            <TextField
              sx={{ width: "100%", pb: 2 }}
              id="filled-basic"
              label="Address"
              variant="filled"
              {...register("address")}
            />
            <TextField
              sx={{ width: "100%", pb: 2 }}
              id="filled-basic"
              label="Email Address"
              variant="filled"
              {...register("email_address")}
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
            >
              <TextField
                sx={{ width: 300 }}
                id="filled-basic"
                label="Contact Number"
                variant="filled"
                {...register("contact_no")}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  variant="filled"
                  label="Date of birth"
                  format="DD/MM/YYYY"
                  defaultValue={dayjs(new Date())}
                  {...field}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
            >
              {/*  Status*/}
              <BasicSelect
                label="Material Status"
                options={[
                  { value: "single", label: "Single" },
                  { value: "married", label: "Married" },
                ]}
                value={status}
                onChange={(event: SelectChangeEvent) =>
                  setStatus(event.target.value as string)
                }
                register={register("material_status")}
              />

              {/*    Department*/}

              <BasicSelect
                label="Department"
                options={department}
                value={departmentDropDown}
                onChange={(event: SelectChangeEvent) =>
                  setDepartmentDropDown(event.target.value as string)
                }
                register={register("departmentId")}
              />
            </Box>
            <BasicSelect
              label="Zone"
              options={zones}
              value={zoneDropDown}
              width={535}
              onChange={(event: SelectChangeEvent) =>
                setZoneDropDown(event.target.value as string)
              }
              register={register("zoneId")}
            />

            <Button
              className="w-full mt-4"
              size="sm"
              onClick={() => console.log("clicked")}
              type="submit"
            >
              Submit
            </Button>

            <Button
              className="w-full mt-4 bg-transparent text-slate-700 hover:bg-transparent"
              size="sm"
              onClick={() => console.log("clicked")}
            >
              clear
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
