import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import Joi from "joi";
import {  useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import UserInput from "../../../Components/common/UserInput/UserInput";
import CustomDatepicker from "../../Components/CustomDatepicker";
import CustomTable from "../../Components/CustomTable";
import FilledBtn from "../../Components/FilledBtn";
import { contentTypeTableField } from "../../Constance/contentTypeTableData";


const schema = Joi.object({
  type: Joi.string().required(),
});

const TypeOfContent = () => {
  const [show, setShow] = useState(false);
  const [contentType ,setContentType] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/admin/content-type")
      setContentType(response.data)
    })();
  }, [show]);


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
        resolver: joiResolver(schema),
  });

  const onSubmit = async (content) => {
    try {

      const res = await axios.post("admin/add-content-type", content);
        if(res.status === 200){
          setShow(false)          
        }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Row className="mb-5">
        <Col>
          <h4>List View Of Content / Type Of Content</h4>
        </Col>
        <Col className="text-end">
          <div className="d-inline-block me-3">
            <Form.Select style={{ height: "40px" }}>
              <option>Select Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <CustomDatepicker className={"me-3"} />
          <FilledBtn text="Add Data" onClick={handleShow} />
        </Col>
      </Row>
      <CustomTable fields={contentTypeTableField} data={contentType} />
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>      
            <Form.Group className="mb-3">
              <Row>
                <Col md={3}>
                  <Form.Label>Content Type</Form.Label>
                </Col>
                <Col md={5}>
                  <UserInput type="text" name="type" control={control} />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <FilledBtn text={"Save"} onClick={handleSubmit(onSubmit)} />
          <FilledBtn text={"Cancel"} onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TypeOfContent;
