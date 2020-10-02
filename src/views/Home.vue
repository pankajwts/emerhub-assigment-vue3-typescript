<template>
<div class="home">
    <div>
        <table class="table-auto min-w-full leading-normal">
            <thead>
                <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="feedback in feedbacks" :key="feedback.id">
                    <td class="border px-4 py-2">{{feedback.name}}</td>
                    <td class="border px-4 py-2">{{feedback.company}}</td>
                    <td class="border px-4 py-2">{{feedback.email}}</td>
                    <td class="border px-4 py-2">{{feedback.mobile}}</td>
                    <td class="border px-4 py-2">{{feedback.message}}</td>
                    <td class="border px-4 py-2">{{feedback.status ? feedback.status: "0"}}%</td>
                    <td class="border px-4 py-2">
                        <router-link :to="{ name: 'formEdit', params: {id: feedback.id}}" class="text-blue-900 hover:text-blue-800">Edit</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script lang="ts">
import firebase from '../utils/firebase';
import {
    Options,
    Vue
} from 'vue-class-component';

@Options({
    components: {},
})
export default class Home extends Vue {

    public feedbacks: FeedbackInterface[] = [];

    mounted() {
        this.fetchFeedbacks();
    }

    fetchFeedbacks() {
        firebase.db
            .collection("feedbacks")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    this.feedbacks.push({
                        id: doc.id,
                        name: docData.name,
                        company: docData.company,
                        email: docData.email,
                        mobile: docData.mobile,
                        message: docData.message,
                        status: docData.status,
                    });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    deleteFeedback(id: string) {
        firebase.db
            .collection("feedbacks")
            .doc(id)
            .delete()
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }
}

type FeedbackInterface = {
    id: string;
    name: string;
    company: string;
    email: string;
    mobile: string;
    message: string;
    status: number;
}
</script>
