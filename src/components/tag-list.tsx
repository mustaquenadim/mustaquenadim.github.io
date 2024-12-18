import { getTagsWithCount } from '@utils/getPost';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';

const TagList = () => {
  const tags = getTagsWithCount();

  return (
    <>
      <span className="breadcrumb">
        <span className="arrow">&larr;</span>
        <Link href="/blogs">All memories</Link>
      </span>

      <h1>Tags</h1>
      <ul className="fancy-list">
        {tags.map(tag => (
          <li key={tag.fieldValue}>
            <Link href={`/blogs/tag/${kebabCase(tag.fieldValue)}/`} className="inline-link">
              {tag.fieldValue} <span className="count">({tag.totalCount})</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TagList;
