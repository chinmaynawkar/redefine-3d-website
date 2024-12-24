const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      <span className='flex items-center justify-center'>
        {leftIcon && <span className='mr-2'>{leftIcon}</span>}
        <span className='font-general text-xs uppercase'>{title}</span>
        {rightIcon && <span className='ml-2'>{rightIcon}</span>}
      </span>
    </button>
  )
}

export default Button
