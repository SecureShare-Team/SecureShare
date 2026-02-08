import React from 'react';

export default function FileItem({ file }) {
  return (
    <div className="file-item">
      <p>{file?.name}</p>
    </div>
  );
}
