import './errors.css'

export default function Errors({errors}) {
    const errorsList = Object.values(errors)

	return errorsList.length > 0 ? (
		<div class='alert'>
			<span className='closebtn' onClick={(e) => e.currentTarget.parentElement.style.display='none'}>
				&times;
			</span>
			<ul>
                {errorsList.map(error => <li>{error}</li>)}
            </ul>
		</div>
	) : null;
}
