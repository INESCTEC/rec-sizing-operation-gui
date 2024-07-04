import { Form, Stack, Button, NumberInput } from "@carbon/react";
import styles from "../../InterfaceContent.module.css";

function SearchMetersFormView({ onSubmit, setFormData }) {
  return (
    <>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <div className={styles.formWrapper}>
            <Form
              aria-label="sample form"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <Stack gap={7}>
                <NumberInput
                  id="Latitude"
                  label="Latitude"
                  className={styles.numberInput}
                  min={0}
                  value={0}
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
                  min={0}
                  value={0}
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
                <Button className="primary-button" type="submit">
                  Submit
                </Button>
              </Stack>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchMetersFormView;
