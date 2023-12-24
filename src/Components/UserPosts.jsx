import axios from 'axios';
import { useEffect, useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { ProgressSpinner } from "primereact/progressspinner";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import data from '../data/dataServer.json';
import NewPost from "./NewPost";

const UserPosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        const fetchData = async () => { //Loading the posts and in case of failure - loading from an outdated JSON file and uploading a message to the user
            try {
                const response = await Promise.race([
                    axios.get('https://jsonplaceholder.typicode.com/posts'),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 60000))
                ]);
                setPosts(response.data);
            } catch (error) {
                setFlag(false);
                setPosts(data.posts);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) { 
        return (
            <ProgressSpinner />
        )
    }

    const showPost = () => { //Retrieving the appropriate posts from among all the posts and adapting them for visualization
        var psts = [];
        posts.forEach(element => {
            element.userId == props.selectedUser && psts.push(
                <Fieldset className='mt-3' legend={element.title}>
                    <p className="m-0">
                        {element.body}
                    </p>
                </Fieldset>
            )
        });
        return psts;
    }

    return (
        <ScrollPanel className="card h-screen" >
            {!flag && <div className="text-red-500 text-lg m-2">Internet connection failed, users is not updated</div>}
            {showPost()}
            <Button onClick={() => setVisible(true)} //Add posts button
                className="shadow-6"
                icon="pi pi-plus text-2xl"
                rounded
                severity="success"
                style={{ position: "fixed", bottom: "5%", right: "5%", width: "3.5em", height: "3.5em", }} />
            <NewPost posts={posts} setPosts={setPosts} selectedUser={props.selectedUser} visible={visible} setVisible={setVisible}></NewPost>
        </ScrollPanel>
    )
};

export default UserPosts;