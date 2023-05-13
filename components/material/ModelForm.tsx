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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
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
    await axios.post("/api/members", formData, {}).then(function (response) {});
    setOpen(false);
    router.push("/");
  };

  const handleModel = () => {
    setOpen(!open);
  };

  function isMorningOrAfternoon(time: Date): string {
    const hours = time.getHours();
    if (hours >= 5 && hours <= 12) {
      return "morning";
    } else if (hours >= 13 && hours <= 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

  console.log(isMorningOrAfternoon(new Date()));
  console.log(dayjs().format("dddd"));

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
                error={errors.first_name && true}
                helperText={errors.first_name && "First name is required"}
                {...register("first_name", {
                  required: true,
                })}
              />
              <TextField
                id="filled-basic"
                label="Surname"
                variant="filled"
                error={errors.last_name && true}
                helperText={errors.last_name && "Surname is required"}
                {...register("last_name", { required: true })}
              />
            </Box>
            <TextField
              sx={{ width: "100%", pb: 2 }}
              id="filled-basic"
              label="Address"
              variant="filled"
              error={errors.address && true}
              helperText={errors.address && "Address is required"}
              {...register("address", { required: true })}
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
                error={errors.contact_no && true}
                helperText={errors.contact_no && "Contact number is required"}
                {...register("contact_no", { required: true })}
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
                register={register("material_status", { required: true })}
              />

              {/*    Department*/}

              <BasicSelect
                label="Department"
                options={department}
                value={departmentDropDown}
                onChange={(event: SelectChangeEvent) =>
                  setDepartmentDropDown(event.target.value as string)
                }
                register={register("departmentId", { required: true })}
                name="departmentId"
                errors={errors}
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
              register={register("zoneId", { required: true })}
              name="zoneId"
              errors={errors}
            />

            <Button className="w-full mt-4" size="sm" type="submit">
              Submit
            </Button>

            <Button
              className="w-full mt-4 bg-transparent text-slate-700 hover:bg-transparent"
              size="sm"
              onClick={() => reset()}
            >
              clear
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
