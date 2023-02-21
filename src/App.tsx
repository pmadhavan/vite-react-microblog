import './App.css';
import { Card, Post } from './components/Card';
import { Form } from './components/Form';
import { useData } from './hooks/useData';

const POSTS_URL = 'https://dummyjson.com/posts';
function App() {
  // Phase3: Fetch data from server and replace the static list
  const { data, setData, isLoading, isError } =
    useData<{ posts: Post[] }>(POSTS_URL);
  const posts = data ? data.posts : [];
  const handleSubmit = (post: Post) => {
    setData({ ...data, posts: [post, ...posts] });
  };

  return (
    <div className="App">
      <h2>Microblog</h2>
      {/* Phase 2: Add a form to create a post  */}
      <Form onSubmit={handleSubmit} />
      {isError && <div>Something went wrong!</div>}
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        // Phase 1: Display list of data
        posts.map((post: Post) => {
          return <Card key={post.id} title={post.title} body={post.body} />;
        })
      )}
    </div>
  );
}

export default App;
