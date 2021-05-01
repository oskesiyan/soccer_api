import axios from "axios"

export const getData = async (url) => {
	try {
		console.log('index',`${process.env.REACT_APP_API_KEY1}`)
		const result = await axios.get(
		//Сюда нужно передавать id соревнования 2002
		
		url,
		{ headers: { 'X-Auth-Token': `${process.env.REACT_APP_API_KEY1}` } })
		
		return result		
	}
	catch (error) {
		throw error
	}
}

