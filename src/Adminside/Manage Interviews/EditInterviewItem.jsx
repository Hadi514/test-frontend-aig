import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ReactQuill from "react-quill"
import InterviewContext from "../../ContextApi/InterviewContext";
import InterviewCatContext from "../../ContextApi/InterviewCatContext";

export default function EditInterviewItem({ interviewId }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [lgShow, setLgShow] = useState(false);
    const { getInterviewId, interviewById, allInterviewEntries, setInterviewById } = useContext(InterviewContext)
    const { interviewCat } = useContext(InterviewCatContext)

    const editAndShowModal = () => {
        setLgShow(true)
        getInterviewId(interviewId)
    }

    const updateResource = async (e) => {
        e.preventDefault()
        await fetch(`${apiUrl}/api/interview/editInterview/${interviewById._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: interviewById.title,
                category: interviewById.category,
                content: interviewById.content,
                slug: interviewById.slug,
            }),
        });
        allInterviewEntries();
    };

    const onchange = (e) => {
        setInterviewById({ ...interviewById, [e.target.name]: e.target.value });
    };
    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faPen}
                onClick={() => editAndShowModal()}
                style={{cursor: "pointer"}}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Interivew Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateResource}>
                        <label className="form-lable">Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={interviewById.title}
                            onChange={onchange}
                        />
                        <label className="form-lable">Slug</label>
                        <input
                            className="form-control"
                            type="text"
                            name="slug"
                            style={{ color: "red" }}
                            value={interviewById.slug}
                            onChange={onchange}
                        />
                        <label className="form-lable">Category</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="category"
                            value={interviewById.category}
                            onChange={onchange}
                        >
                            <option value="">Select a category</option>
                            {interviewCat &&
                                interviewCat.map((select, index) => (
                                    <option key={index}>{select.category}</option>
                                ))}
                        </select>
                        <label className="form-lable">Content</label>
                        <ReactQuill
                            theme="snow"
                            value={interviewById.content}
                            onChange={(value) =>
                                onchange({ target: { name: "content", value } })
                            }
                        />
                        <div className="py-2 text-center">
                        <button type="submit" className="first-button text-white">Update Interview Item</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

EditInterviewItem.propTypes = {
    interviewId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

EditInterviewItem.defaultProps = {
    interviewId: null,
};