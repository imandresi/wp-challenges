import {RichText} from '@wordpress/block-editor';

export function RichTextEx(props) {
	const {
		id,
		setSelectedControl,
		cardIsClicked
	} = props;

	const richTextProps = {
		tagname: props.tagname,
		className: props.className,
		placeholder: props.placeholder,
		value: props.value,
		allowedFormats: props.allowedFormats,
		style: props.style,
		onChange: props.onChange,
		onBlur: () => {
			if (cardIsClicked.current) {
				setSelectedControl(null);
			}
		},
		onFocus: () => {
			setSelectedControl(id);
		},
	};

	return (
		<RichText {...richTextProps}/>
	);

}
