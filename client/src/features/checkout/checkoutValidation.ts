import * as yup from 'yup';

export const validationSchema = [
    yup.object({

        fullName: yup.string().required('Ad Soyad bilginizi girmelisiniz...'),
        address1: yup.string().required('Address bilginizi girmelisiniz...'),
        address2: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        country: yup.string().required()
    }),
    yup.object(),
    yup.object({
        nameOnCard:yup.string().required()
    })
]