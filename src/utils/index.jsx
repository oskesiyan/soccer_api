import axios from "axios"

export const getData = async (url) => {
	try {
		const result = await axios.get(
		url,
		{ headers: { 'X-Auth-Token': `${process.env.REACT_APP_API_KEY}` } })
		return result		
	}
	catch (error) {
		throw error
	}
}

