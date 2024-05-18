import {__} from '@wordpress/i18n';
import {InnerBlocks, useBlockProps, BlockControls} from '@wordpress/block-editor';
import iconAdd from '../../assets/images/add-item.svg';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	return (

		<section {...useBlockProps()}>
			<BlockControls
				controls={[
					{
						title: 'Add Item',
						icon: <img src={iconAdd}/>,
						onClick: () => console.log('Button clicked')
					}
				]}
			>

			</BlockControls>
			<InnerBlocks
				allowedBlocks={['imandresi/blockordion-plus-blockitem']}
				template={[
					['imandresi/blockordion-plus-blockitem']
				]}
			/>

		</section>
	);
}
