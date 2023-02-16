import { useEffect, useState } from 'react';
import './App.css';
import { Card, Post } from './components/Card';
import { Form } from './components/Form';
import { posts } from './data/posts';

function App() {
  const [postsData, setPostsData] = useState<Post[]>(posts);
  const handleSubmit = (post: Post) => {
    setPostsData([post, ...postsData]);
  };

  return (
    <div className="App">
      <h2>Microblog</h2>
      <Form onSubmit={handleSubmit} />
      {postsData &&
        postsData.map((post: Post) => {
          return <Card key={post.id} title={post.title} body={post.body} />;
        })}
    </div>
  );
}

export default App;
