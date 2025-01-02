import { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from 'sweetalert2'
import ResourceCatContext from "../../ContextApi/ResourceCatContext";

export default function AddResource() {
  const [editorHtml, setEditorHtml] = useState("");
  const [slug, setSlug] = useState("");
  const { resourceCat } = useContext(ResourceCatContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const [credentials, setCredentials] = useState({
    title: "",
    category: "",
    meta: ""
  });

  const [successMessage] = useState("");
  const RefForm = useRef();

  useEffect(() => {
    const GenerateSlug = () => {
      const slug = credentials.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(slug);
    };
    GenerateSlug();
  }, [credentials.title]);

  const resourceCreate = async (e) => {
    e.preventDefault();
    let Error = false;
    const form = RefForm.current;
    const cat = form.category.value.trim();
    const tit = form.title.value.trim();
    const con = editorHtml.trim();
    const cate = document.getElementById("categoryI");
    const titl = document.getElementById("titleI");
    const conten = document.getElementById("contentI");

    if (!cat) {
      cate.innerText = "Please enter category";
      Error = true;
    } else {
      cate.innerText = "";
    }
    if (!tit) {
      titl.innerText = "Please enter title";
      Error = true;
    } else {
      titl.innerText = "";
    }
    if (!con) {
      conten.innerText = "Please enter content";
      Error = true;
    } else {
      conten.innerText = "";
    }

    if (Error) {
      return;
    }

    const { title, category, meta } = credentials;

    const res = await fetch(`${apiUrl}/api/resource/createResource`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, category, content: editorHtml, slug, meta })
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Resource added successfully!",
                    showConfirmButton: true,
                  });
      setCredentials({
        title: "",
        category: "",
        meta: ""
      });
      setSlug("");
      setEditorHtml("");
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundColor: "rgb(246 249 255)" }}>
      <div className="container">
        {successMessage && (
          <div className="alert alert-info blog-alert">{successMessage}</div>
        )}

        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <form className="form-group admin-form p-3" onSubmit={resourceCreate} ref={RefForm}>
              <div className="form-title">
                <h2>Add A Resource</h2>
              </div>

              <select
                className="form-select mt-3 mb-3"
                aria-label="Default select example"
                name="category"
                onChange={onchange}
                style={{ height: '55px', borderRadius: '0' }}
              >
                <option value="">Select a category</option>
                {resourceCat &&
                  resourceCat.map((select, index) => (
                    <option key={index} value={select.category}>
                      {select.category}
                    </option>
                  ))}
              </select>
              <div id="categoryI" style={{ color: "red" }}></div>

              <input
                className="form-control mb-3"
                type="text"
                name="title"
                value={credentials.title}
                onChange={onchange}
                placeholder="Title Here"
                style={{ height: '55px', borderRadius: '0' }}
                maxLength={60}  // Character limit for title
              />
              <div id="titleI" style={{ color: "red" }}></div>

              <input
                className="form-control mb-3"
                type="text"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Slug"
                style={{ height: '55px', borderRadius: '0', color: "red" }}
              />

              <input
                className="form-control"
                type="text"
                name="meta"
                value={credentials.meta}
                onChange={onchange}
                placeholder="Meta Description"
                style={{ height: '55px', borderRadius: '0' }}
                maxLength={150}  // Character limit for meta
              />
              <div id="metaI" style={{ color: "red" }}></div>
              <label className="mt-3" htmlFor="content">
                Blog Content
              </label>
              <ReactQuill
                style={{ backgroundColor: "white" }}
                theme="snow"
                name="content"
                value={editorHtml}
                onChange={handleEditorChange}
              />
              <div id="contentI" style={{ color: "red" }}></div>

              <div className=" d-flex justify-content-center mt-3">
                <button className="first-button text-white" type="submit">
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
