import { getPostsByTag } from '@utils/getPost';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';

const PostsByTag = ({ tag }) => {
  const posts = getPostsByTag(tag);

  return (
    <>
      <h1>
        <span>#{tag}</span>
        <span>
          <Link href="/blogs/tags">View all tags</Link>
        </span>
      </h1>

      <ul className="fancy-list">
        {posts.map(post => {
          const { title, slug, date, tags } = post.metadata;
          return (
            <li key={slug}>
              <h2>
                <Link href={slug}>{title}</Link>
              </h2>
              <p className="subtitle">
                <time>
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>&nbsp;&mdash;&nbsp;</span>
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag, i) => (
                    <Link key={i} href={`/blogs/tag/${kebabCase(tag)}/`} className="tag">
                      #{tag}
                    </Link>
                  ))}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PostsByTag;
