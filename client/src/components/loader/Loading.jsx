import "./Loading.css";
export default function Loading(props) {
	return (
		<div className="spinner spinner-border text-primary" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);
}
