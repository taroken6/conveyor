import React from 'react'
import { Link } from 'react-router-dom'

export const Modal = ({ id, title, children }) => (
  <div className='modal fade' id={id} tabIndex={-1}>
    <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title'>{title}</h5>
          <button type='button' className='close' data-dismiss='modal'>&times;</button>
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>
  </div>
)

const ImageModal = ({ id, title, url }) => {
  let child
  if (!url) {
    child = (
      <div className='text-center'>{'...generating image'}</div>
    )
  } else {
    child = (
      <div className='text-center'>
        <div>
          <a href={url} target='_blank' rel='noopener noreferrer'>
            <img className='img-fluid' src={`${url}?ts=${Date.now()}`} />
          </a>
        </div>
        <div>
          <a className='text-secondary' href={url} target='_blank' rel='noopener noreferrer'>Click to view the original image.</a>
        </div>
      </div>
    )
  }
  return (
    <Modal {...{ id, title }}>
      {child}
    </Modal>
  )
}

export const ImageLinkModal = ({
  id,//stays
  title,//stays
  url,//stays

  loading = false,
}) => {
  if ((!url || url === 'None') && !loading) { return <span>No Image</span> }
  return (
    <React.Fragment>
      <Link to={`show-${id}`} data-toggle='modal' data-target={'#' + id}>
        Click to view*
      </Link>
      <ImageModal {...{ id, title, url }} />
    </React.Fragment>
  )
}
