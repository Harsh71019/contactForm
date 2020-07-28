import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Image } from "react-bootstrap";
import WidgetMenu from "./WidgetMenu";
import AwLoader from "components/ui/AwLoader";
import { PlusCircle, Trash2, Edit, ArrowDown, ArrowUp } from "react-feather";
import { getWidget } from "redux/actions";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import {
    renderDropdown,
    renderTextField,
    FileInput
    // FileInput
} from "components/ui/ReduxFormElements";
import { Field, FieldArray, reduxForm, Form } from "redux-form";
import { required, validateFile } from "utils/validation";

////////////////////////////////////////////MOVING ITEMS UP AND DOWN CODE///////////////////////////////////////////////////////

// Components
let ContactForm = (props) => {
    const { action } = props;
    const drop = {};
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            <span className="threedots" />
        </a>
    ));

    const [modalShow1, setModalShow1] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);
    const [modalShow3, setModalShow3] = React.useState(false);
    const [modalShow4, setModalShow4] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [idM, setIdM] = React.useState(0);
    const [idD, setIdD] = React.useState(0);
    const [idS, setIdS] = React.useState(0);
    const [idL, setIdL] = React.useState(0);
    const [x, setX] = React.useState(null);
    const [singleLineText, setSingleLineText] = useState([{ singleLine: "" }]);
    const [multiLineText, setMultiLineText] = useState([{ multiLine: "" }]);
    const [dropDownText, setDropDownText] = useState([{ dropDown: "" }]);
    const [submitText, setSubmit] = useState([{ submit: "" }]);
    const [labelText, setLabelText] = useState([{ labelLine: "" }]);
    const [showDropDown, setDropDown] = useState(false);
    const [label, setLabel] = useState(0);

    ///handle single change//////////////////////////////////////////////////////////////////////////////////
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...singleLineText];
        list[index][name] = value;
        setSingleLineText(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...singleLineText];
        list.splice(index, 1);
        setSingleLineText(list);
        setId(index);
        console.log(index);
    };

    // handle click event of the Add button
    const handleAddClick = (index) => {
        setId(index);
        setSingleLineText([...singleLineText, { singleLine: "" }]);
    };

    //////for Multiline drop//////////////////////////////////////////////////////////////////////////////////////////////
    const handleInputChangeM = (e, index) => {
        const { name, value } = e.target;
        const list = [...multiLineText];
        list[index][name] = value;
        setMultiLineText(list);
    };

    // handle click event of the Remove button
    const handleRemoveClickM = (index) => {
        const list = [...multiLineText];
        list.splice(index, 1);
        setMultiLineText(list);
        setIdM(index);
        console.log(index);
    };

    // handle click event of the Add button
    const handleAddClickM = (index) => {
        setIdM("multiple" + index);
        setMultiLineText([...multiLineText, { multiLineText: "" }]);
    };

    //////////for Dropdown/////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleInputChangeD = (e, index) => {
        const { name, value } = e.target;
        const list = [...dropDownText];
        list[index][name] = value;
        setDropDownText(list);
        // setDropDown(!showDropDown ===true )
    };

    // handle click event of the Remove button
    const handleRemoveClickD = (index) => {
        const list = [...dropDownText];
        list.splice(index, 1);
        setDropDownText(list);
        setIdD(index);
        console.log(index);
    };

    // handle click event of the Add button
    const handleAddClickD = (index) => {
        setIdD("drop" + index);
        setDropDownText([...dropDownText, { dropDown: "" }]);
    };

    const dropDownLogic = () => {
        return setDropDown(true);
    };

    const logicDrop = () => {
        if (showDropDown === false) {
            dropDownLogic();
        } else if (showDropDown === true) {
            handleAddClickD();
        }
    };

    const isGettingWidget = action.GET_WIDGET.isFetching;

    ////////////////////////////////Single Text Modal///////////////////////////////////////////////////////////////

    ////////////////////////////////Single Text Modal///////////////////////////////////////////////////////////////

    ////////////////////////////////Single Text Modal///////////////////////////////////////////////////////////////
    function MyVerticallyCenteredModal(props) {
        console.log(id);
        return (
            <Modal
                className="single"
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Field Single Line Text!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="mb-4" key={id}>
                            <h6>Type</h6>

                            <Field
                                isSelectDefault={true}
                                placeholder="Type"
                                component="select"
                                className="form-control"
                                disabled={false}
                                name={props.number + "dropDownSelect"}
                            >
                                <option>Email</option>
                                <option>Text</option>
                            </Field>
                        </div>
                        <div className="mb-4">
                            <h6>Label</h6>
                            <Field
                                type="text"
                                className="form-control-contact"
                                // value={x.multiLine}
                                component={renderTextField}
                                name={props.number + "LabelForSingleLine"}
                                disabled={false}
                                placeholder="Single line text: Message"
                                validate={[required]}
                            />
                        </div>

                        <div className="mb-4">
                            <h6>Placeholder</h6>
                            <Field
                                type="text"
                                className="form-control-contact"
                                // value={x.multiLine}
                                component={renderTextField}
                                name={props.number}
                                disabled={false}
                                placeholder="Single line text: Message"
                                validate={[required]}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide1}>Save</Button>
                    {/* <Button onClick={props.onHide1}>Save</Button>
                    {singleLineText.length !== 1 && (
                        <Button
                            className="mr10"
                            onClick={() => handleRemoveClick({ id })}
                        >
                            Delete
                        </Button>
                    )} */}
                </Modal.Footer>
            </Modal>
        );
    }

    ////////////////////////////////MultiLineModal///////////////////////////////////////////////////////////////

    function MultiLineModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="multiple"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Field Multiline Text!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Label</h5>

                    <Form>
                        <div className="form-group">
                            <Field
                                type="text"
                                className="form-control-contact"
                                component={renderTextField}
                                name={props.number + "labelMultiline    "}
                                disabled={false}
                                placeholder="Multi line text: Message"
                            />
                        </div>

                        <h5>Placeholder</h5>
                        <Field
                            type="text"
                            className="form-control-contact"
                            component={renderTextField}
                            name={props.number}
                            disabled={false}
                            placeholder="Multi line text: Message"
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide2}>Save</Button>
                    {/* <Button onClick={props.onHide2}>Save</Button>
                    {multiLineText.length !== 1 && (
                        <Button
                            className="mr10"
                            onClick={() => handleRemoveClickM({ idM })}
                        >
                            Delete
                        </Button>
                    )} */}
                </Modal.Footer>
            </Modal>
        );
    }
    ////////////////////////////////DropDown Modal///////////////////////////////////////////////////////////////

    function DropdownModal(props) {
        ////////////////////////////////////Label add and drop for dropdown Items//////////////////////////////////

        const handleInputChangeL = (e, index) => {
            const { name, value } = e.target;
            const list = [...labelText];
            list[index][name] = value;
            setLabelText(list);
        };

        // handle click event of the Remove button
        const handleRemoveClickL = (index) => {
            const list = [...labelText];
            list.splice(index, 1);
            setLabelText(list);
            setIdL(index);
            console.log(index);
        };

        // handle click event of the Add button
        const handleAddClickL = (index) => {
            setIdL("single" + index);
            setLabelText([...labelText, { labelLine: "" }]);
        };
        return (
            <div>
                <Modal
                    {...props}
                    size="lg"
                    dialogclassname="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter"
                    contentClassName="custom-modal-style"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Dropdown Text!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="icon-relative-div">
                            <div className="adjustModal">
                                <div className="pb-4">
                                    <h6>Label!</h6>
                                    <Field
                                        type="text"
                                        className="form-control-contact"
                                        component={renderTextField}
                                        name={"label"}
                                        disabled={false}
                                        placeholder="Label DropDown"
                                    />
                                </div>
                                {labelText.map((x4, i4) => {
                                    return (
                                        <div className="pb-4 pt-2 reduce">
                                            <Field
                                                type="text"
                                                class="form-control"
                                                component={renderTextField}
                                                value={x4.labelLine}
                                                name={"option" + i4}
                                                placeholder="DropDown Options"
                                            />
                                        </div>
                                    );
                                })}

                                {/* <div className="pb-4 pt-4 reduce">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Label"
                                    placeholder="DropDown Options"
                                ></input>
                            </div> */}

                                <div className="circle">
                                    <span>
                                        <PlusCircle
                                            size={20}
                                            onClick={handleAddClickL}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <span className="trash">
                                        <Trash2
                                            size={20}
                                            onClick={() =>
                                                handleRemoveClickL({ idL })
                                            }
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide3}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    ////////////////////////////////Submit Modal///////////////////////////////////////////////////////////////

    function Submit(props) {
        return (
            <Modal
                {...props}
                size="lg"
                className="dropdown"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Submit Modal!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form name="submitButton">
                        <Row className="p-4">
                            <Field
                                type="text"
                                className="form-control-contact"
                                component={renderTextField}
                                disabled={false}
                                placeholder="Submit Button"
                                validate={[required]}
                                name="submitButton"
                            />
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide4}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const [items, setItems] = useState([
        singleLineText,
        multiLineText,
        dropDownText
    ]);
    const onMoveUp = function (key) {
        if (key === 0) return;
        const index = key - 1;
        const itemAbove = items[index];
        items[key - 1] = items[key];
        items[key] = itemAbove;
        setItems({ items });
    };

    const onMoveDown = function (key) {
        if (key === items.length - 1) return;
        const index = key + 1;
        const itemBelow = items[index];
        items[key + 1] = items[key];
        items[key] = itemBelow;
        setItems({ items });
    };
    ////////////////////////////// /// Main return///////////////////////////////////////////////////
    ////////////////////////////// /// Main return///////////////////////////////////////////////////

    ////////////////////////////// /// Main return///////////////////////////////////////////////////

    ////////////////////////////// /// Main return///////////////////////////////////////////////////

    ////////////////////////////// /// Main return///////////////////////////////////////////////////

    return (
        <div className="container-body">
            {isGettingWidget && <AwLoader />}

            <div className="container-fluid no-padding">
                <WidgetMenu activeComp="contactform" />

                <div className="section-body-container">
                    <div className="widget-settings-section-contact">
                        <div className="place">
                            <Row className="p-4">
                                <Col className="d-flex align-items-center ">
                                    <h5>Contact Form</h5>
                                </Col>

                                <Col xs={7} className="d-flex">
                                    <Dropdown disabled>
                                        <Dropdown.Toggle
                                            variant="primary"
                                            id="dropdown-basic"
                                        >
                                            Add Field
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={handleAddClick}
                                            >
                                                Single Line
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={handleAddClickM}
                                            >
                                                Multi-Line
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    logicDrop();
                                                }}
                                            >
                                                Dropdown
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>

                            {singleLineText.map((x, i) => {
                            

                                return (
                                    <div className="place" key={i}>
                                        <Row className="pl-4 pr-4 pb-2 pt-2 ">
                                            <Field
                                                type="Email"
                                                // className="form-control-contact"
                                                value={x.singleLine}
                                                component={renderTextField}
                                                name={i + "p"}
                                                disabled={true}
                                                placeholder="Single Line Text: Email"
                                                validate={[required]}
                                            />
                                            <div className="three">
                                                {/* <a href="" onClick={() => {}}>
                                                <span className="threedots" />
                                            </a> */}
                                                <Dropdown drop="left">
                                                    <Dropdown.Toggle
                                                        className="headerUserDropdown"
                                                        as={CustomToggle}
                                                    />
                                                    <Dropdown.Menu size="sm">
                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                setModalShow1(
                                                                    true
                                                                )
                                                            }
                                                            as="button"
                                                        >
                                                            <Edit size={15} />{" "}
                                                            Edit
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <ArrowUp
                                                                size={15}
                                                            />{" "}
                                                            Move Up
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <ArrowDown
                                                                size={15}
                                                            />{" "}
                                                            Move Down
                                                        </Dropdown.Item>

                                                        {singleLineText.length !==
                                                            1 && (
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleRemoveClick(
                                                                        {
                                                                            id
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <Trash2
                                                                    size={15}
                                                                />
                                                                Delete
                                                            </Dropdown.Item>
                                                        )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Row>
                                        <MyVerticallyCenteredModal
                                            number={i + "p"}
                                            key={i}
                                            show={modalShow1}
                                            onHide1={() => setModalShow1(false)}
                                        />
                                    </div>
                                );
                            })}

                            {multiLineText.map((x1, i1) => {
                                return (
                                    <div className="place">
                                        <Row className="pl-4 pr-4 pb-2 pt-2 ">
                                            <Field
                                                type="text"
                                                name={"multiple" + i1}
                                                className="form-control-contact"
                                                value={x1.multiLine}
                                                component={renderTextField}
                                                disabled={true}
                                                placeholder="Multi line text: Message"
                                                validate={[required]}
                                                onChange={(e) =>
                                                    handleInputChangeM(i1, e)
                                                }
                                            />
                                            <div className="three">
                                                {/* <a href="" onClick={() => {}}>
                                                <span className="threedots" />
                                            </a> */}
                                                <Dropdown drop="left">
                                                    <Dropdown.Toggle
                                                        className="headerUserDropdown"
                                                        as={CustomToggle}
                                                    />
                                                    <Dropdown.Menu size="sm">
                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                setModalShow2(
                                                                    true
                                                                )
                                                            }
                                                            as="button"
                                                        >
                                                            <Edit size={15} />{" "}
                                                            Edit
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <ArrowUp
                                                                size={15}
                                                            />{" "}
                                                            Move Up
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <ArrowDown
                                                                size={15}
                                                            />{" "}
                                                            Move Down
                                                        </Dropdown.Item>

                                                        {multiLineText.length !==
                                                            1 && (
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleRemoveClickM(
                                                                        {
                                                                            idL
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <Trash2
                                                                    size={15}
                                                                />{" "}
                                                                Delete
                                                            </Dropdown.Item>
                                                        )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Row>

                                        <MultiLineModal
                                            number={"multiple" + i1}
                                            show={modalShow2}
                                            onHide2={() => setModalShow2(false)}
                                        />
                                    </div>
                                );
                            })}

                            {showDropDown && (
                                <div>
                                    {dropDownText.map((x3, i3) => {
                                        return (
                                            <div className="place">
                                                <Form name={"drop" + i3}>
                                                    <Row className="pl-4 pr-4 pb-3 mb-2 pt-2 handoffRowContact">
                                                        {/* <Row className="handoffRowContact"> */}
                                                        <Field
                                                            isSelectDefault={
                                                                true
                                                            }
                                                            name={"drop" + i3}
                                                            value={x3.dropDown}
                                                            // name="handoff_channels.email"
                                                            placeholder="Select Option"
                                                            component="select"
                                                            className="form-control"
                                                            disabled={true}
                                                            // options={props.email}
                                                        />
                                                        <div className="three">
                                                            {/* <a href="" onClick={() => {}}>
                                                <span className="threedots" />
                                            </a> */}
                                                            <Dropdown drop="left">
                                                                <Dropdown.Toggle
                                                                    className="headerUserDropdown"
                                                                    as={
                                                                        CustomToggle
                                                                    }
                                                                />
                                                                <Dropdown.Menu size="sm">
                                                                    <Dropdown.Item
                                                                        onClick={() =>
                                                                            setModalShow3(
                                                                                true
                                                                            )
                                                                        }
                                                                        as="button"
                                                                    >
                                                                        <Edit
                                                                            size={
                                                                                15
                                                                            }
                                                                        />{" "}
                                                                        Edit
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item>
                                                                        <ArrowUp
                                                                            size={
                                                                                15
                                                                            }
                                                                        />{" "}
                                                                        Move Up
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item>
                                                                        <ArrowDown
                                                                            size={
                                                                                15
                                                                            }
                                                                        />{" "}
                                                                        Move
                                                                        Down
                                                                    </Dropdown.Item>
                                                                    {handleInputChangeD.length !==
                                                                        1 && (
                                                                        <Dropdown.Item
                                                                            onClick={() =>
                                                                                handleRemoveClickD(
                                                                                    {
                                                                                        idD
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            <Trash2
                                                                                size={
                                                                                    15
                                                                                }
                                                                            />{" "}
                                                                            Delete
                                                                        </Dropdown.Item>
                                                                    )}
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </Row>
                                                    {/* </Row> */}
                                                </Form>

                                                <DropdownModal
                                                    className="Dropdown"
                                                    show={modalShow3}
                                                    number={i3}
                                                    onHide3={() =>
                                                        setModalShow3(false)
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <ul>
                                {items.map((item, key) => (
                                    <li key={key}>
                                        <div>{key + 1}</div>
                                        <div>{item.name}</div>
                                        <div className="fruitArrows">
                                            <span onClick={() => onMoveUp(key)}>
                                                &#x25B2;
                                            </span>
                                            <span
                                                onClick={() => onMoveDown(key)}
                                            >
                                                &#x25BC;
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="place">
                                <Form name="submitButton">
                                    <Row className="pl-4 pr-4 pb-2 pt-2 ">
                                        <Field
                                            type="text"
                                            className="form-control-contact"
                                            component={renderTextField}
                                            disabled={true}
                                            placeholder="Submit Button"
                                            validate={[required]}
                                            name="submitButton"
                                        />
                                        <div className="three">
                                            {/* <a href="" onClick={() => {}}>
                                                <span className="threedots" />
                                            </a> */}
                                            <Dropdown drop="left">
                                                <Dropdown.Toggle
                                                    className="headerUserDropdown"
                                                    as={CustomToggle}
                                                />
                                                <Dropdown.Menu size="sm">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            setModalShow4(true)
                                                        }
                                                        as="button"
                                                    >
                                                        <Edit size={15} /> Edit
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Row>
                                </Form>
                                <Submit
                                    className="Submit"
                                    show={modalShow4}
                                    onHide4={() => setModalShow4(false)}
                                />
                            </div>
                        </div>
                    </div>

                    <Row className="p-4">
                        <Button
                            variant="primary"
                            // disabled={submitting}
                            type="submit"
                            size="sm"
                            className="Save-button"
                        >
                            Save
                        </Button>
                    </Row>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        action: state.action
    };
};

export default connect(mapStateToProps)(
    reduxForm({
        form: "ContactForm", // a unique identifier for this form
        enableReinitialize: true
    })(ContactForm)
);
