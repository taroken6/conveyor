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

export const ImageModal = ({ id, title, url, errorStatus, errorString }) => {
  let child
  if (errorStatus) {
    child = (
      <div className='text-center'>{errorString}</div>
    )
  } else if (!url) {
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

const ImageLink = ({ img, buttonText, customButton }) => {
  if (customButton) { return customButton }
  return (
    <React.Fragment>
      {img && <img className='rounded' src={img} width='30' height='30' />}
      {buttonText}
    </React.Fragment>
  )
}

export const ImageLinkModal = ({
  id,
  title,
  url,
  errorStatus = false,
  errorString,
  img,
  onClick,
  loading = false,
  buttonText = 'Click to view',
  customButton
}) => {
  if ((!url || url === 'None') && !loading) { return <span>No Image</span> }

  return (
    <React.Fragment>
      <Link to={`show-${id}`} data-toggle='modal' data-target={'#' + id} onClick={onClick}>
        <ImageLink
          img={img}
          buttonText={buttonText}
          customButton={customButton}
        />
      </Link>
      <ImageModal {...{ id, title, url, errorStatus, errorString }} />
    </React.Fragment>
  )
}
