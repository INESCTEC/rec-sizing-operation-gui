import {
  Form,
  Stack,
  Button,
  NumberInput,
  Select,
  SelectItem,
} from "@carbon/react";
import styles from "../InterfaceContent.module.css";
import { useState } from "react";

function SearchMetersFormView({ onSubmit, setFormData }) {
  const [select, setSelect] = useState("default");
  return (
    <>
      <div className={styles.formWrapper}>
        <Form
          aria-label="sample form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="card-wrapper">
            <div className="card-header">
              <p>Parameters</p>
            </div>
            <div className="card-body">
              <Stack gap={7}>
                <Select
                  id="select-1"
                  className={styles.select}
                  defaultValue={select}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      dataset_origin: e.target.value,
                    }));
                    setSelect(e.target.value);
                  }}
                  labelText="Meter Origin"
                >
                  <SelectItem
                    disabled
                    hidden
                    value="default"
                    text="Choose meter dataset"
                  />
                  <SelectItem key={"SEL"} value={"SEL"} text={"SEL"} />
                  <SelectItem key={"INDATA"} value={"INDATA"} text={"INDATA"} />
                </Select>
                <NumberInput
                  id="Latitude"
                  label="Latitude"
                  className={styles.numberInput}
                  step={0.000000000000001}
                  min={-90.0}
                  max={90.0}
                  value={0.0}
                  onChange={(_, state) =>
                    setFormData((prev) => ({
                      ...prev,
                      rec_location: {
                        ...prev.rec_location,
                        latitude: state.value,
                      },
                    }))
                  }
                />
                <NumberInput
                  id="Longitude"
                  label="Longitude"
                  className={styles.numberInput}
                  step={0.000000000000001}
                  min={-180.0}
                  max={180.0}
                  value={0.0}
                  onChange={(_, state) =>
                    setFormData((prev) => ({
                      ...prev,
                      rec_location: {
                        ...prev.rec_location,
                        longitude: state.value,
                      },
                    }))
                  }
                />
                <NumberInput
                  id="Radius"
                  label="Radius"
                  className={styles.numberInput}
                  min={0}
                  value={0}
                  onChange={(_, state) =>
                    setFormData((prev) => ({
                      ...prev,
                      radius: state.value,
                    }))
                  }
                />
              </Stack>
            </div>
          </div>
          <div className="row flex-just-end">
            <Button className="primary-button" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default SearchMetersFormView;
