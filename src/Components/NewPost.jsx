import axios from 'axios';
import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";

const NewPost = (props) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [validationTitle, setValidationTitle] = useState(true);
    const [validationBody, setValidationBody] = useState(true);

    const addPostServer = ()=>{ //Attempting to add a post on the server, which fails will only update the array of posts
        const newPost = { userId: props.selectedUser, title: title, body: body };
        axios.post(`https://jsonplaceholder.typicode.com/posts`, newPost)
            .then(function (response) {
            })
            .catch(function (error) {
                props.setPosts([...props.posts, newPost])
            })
    }

    const addPost = () => { //Validation and appropriate sending for creating a post or uploading an appropriate message to the user
        if (title != '' && body != '') {
            addPostServer();

            setBody("");
            setTitle("");
            setValidationBody(true)
            setValidationTitle(true)
            props.setVisible(false);
        }
        else {
            if (title == '' && body == '') {
                setValidationTitle(false);
                setValidationBody(false);
            }
            else {
                if (body == '') {
                    setValidationBody(false);
                    setValidationTitle(true);
                }
                else {
                    setValidationBody(true);
                    setValidationTitle(false);
                }
            }
        }
    }

    const footerContent = ( // buttons...
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => props.setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => addPost()} autoFocus />
        </div>
    );

    return (
        <Dialog header="Add new post" visible={props.visible} style={{ width: '40%' }} onHide={() => props.setVisible(false)} footer={footerContent}>
            <div className="card p-fluid">
                <span className="p-float-label mt-1">
                    <InputText className={!validationTitle && "p-invalid"} value={title} onChange={(e) => { console.log("e", e.value); setTitle(e.target.value); console.log("e", e.value); }} />
                    <label >title</label>
                </span>
                {!validationTitle && <label className="text-red-500 text-sm">Add Title</label>}
                <span className="p-float-label mt-5">
                    <InputTextarea className={!validationBody && "p-invalid"} id="description" value={body} onChange={(e) => { console.log("e", e); setBody(e.target.value) }} rows={5} cols={30} />
                    <label htmlFor="description">Description</label>
                </span>
                {!validationBody && <label className="text-red-500 text-sm">Add Description</label>}
            </div>
        </Dialog>
    )
};

export default NewPost;