<template>
<!-- <h1>Form</h1> -->

<section class="block lg:mx-20 lg:pt-0 bg-gray-300">
    <div class="flex-auto p-5 lg:p-10">
        <h4 class="text-2xl font-semibold">Want to work with us?</h4>
        <p class="leading-relaxed mt-1 mb-4 text-gray-600">
            Complete this form and we will get back to you in 24 hours.
        </p>
        <div class="relative w-full mb-3 mt-8">
            <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="full-name">Full Name</label>
            <input type="text" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Full Name" style="transition: all 0.15s ease" v-model="feedback.name" v-on:blur="handleBlur" />
        </div>
        <div class="relative w-full mb-3">
            <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="comapny">Company</label>
            <input type="text" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Company" style="transition: all 0.15s ease" v-model="feedback.company" v-on:blur="handleBlur" />
        </div>
        <div class="relative w-full mb-3">
            <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="email">Email</label>
            <input type="email" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style="transition: all 0.15s ease" v-model="feedback.email" v-on:blur="handleBlur" />
        </div>
        <div class="relative w-full mb-3">
            <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="mobile">Mobile</label>
            <input type="text" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Mobile" style="transition: all 0.15s ease" v-model="feedback.mobile" v-on:blur="handleBlur" />
        </div>
        <div class="relative w-full mb-3">
            <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="message">Message</label>
            <textarea rows="4" cols="80" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Type a message..." v-model="feedback.message" v-on:blur="handleBlur"></textarea>
        </div>

        <div class="shadow w-full bg-grey-light mt-2" v-if="feedback.status && feedback.status > 0">
            <div class="bg-orange-400 text-xs leading-none py-1 text-center text-white" v-bind:style="{ width: feedback.status + '%' }">
                {{ feedback.status }}%
            </div>
        </div>

        <div class="text-center mt-6">
            <button v-if="newFeedback == true" class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all 0.15s ease" @click="createFeedback">
                Save
            </button>

            <button v-if="newFeedback == false" class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all 0.15s ease" @click="updateFeedback">
                Update
            </button>
        </div>
    </div>
</section>
</template>

<script lang="ts">
import firebase from '../utils/firebase';
import {
    Watch,
} from 'vue-property-decorator'
import {
    Options,
    Vue
} from 'vue-class-component';

export default class Form extends Vue {
    public key = 0
    public newFeedback = true
    public feedbackId: any = ''
    public feedback: FeedbackInterface = {
        name: "",
        company: "",
        email: "",
        mobile: "",
        message: "",
        status: 0,
    };

    public oldFeedback: FeedbackInterface = {
        name: "",
        company: "",
        email: "",
        mobile: "",
        message: "",
        status: 0,
    }

    @Watch('feedbackId')
    fetchFeedback(): void {
        firebase.db
            .collection("feedbacks")
            .doc(this.feedbackId)
            .onSnapshot((doc: any) => {
                if (doc.exists) {
                    this.key = doc.id;
                    this.feedback = doc.data();
                } else {
                    alert("No such document!");
                }
            });
    }
    created(): void {
        if (this.$route.params.id) {
            this.newFeedback = false;

            this.feedbackId = this.$route.params.id;
            this.fetchFeedback();
        } else {
            this.newFeedback = true;
            this.feedbackId = '';
        }
    }
    handleBlur(): void {
        if (
            this.oldFeedback.name != this.feedback.name ||
            this.oldFeedback.company != this.feedback.company ||
            this.oldFeedback.email != this.feedback.email ||
            this.oldFeedback.mobile != this.feedback.mobile ||
            this.oldFeedback.message != this.feedback.message
        ) {
            this.oldFeedback.name = this.feedback.name;
            this.oldFeedback.company = this.feedback.company;
            this.oldFeedback.email = this.feedback.email;
            this.oldFeedback.mobile = this.feedback.mobile;
            this.oldFeedback.message = this.feedback.message;
            if (this.feedbackId == '') {
                this.createFeedback();
            } else {
                this.updateFeedback();
            }
        }
    }

    createFeedback(): void {
        const formData = this.feedback;
        if (formData.name != "") {
            const feedback: FeedbackInterface = formData;
            firebase.db
                .collection("feedbacks")
                .add(feedback)
                .then((docRef: any) => {
                    this.feedbackId = docRef.id;
                    this.newFeedback = false;
                    this.newFeedback = false;
                })
                .catch((error: any) => {
                    console.error("Error writing document: ", error);
                });
        }
    }
    updateFeedback(): void {
        const id = this.feedbackId;
        const formData = this.feedback;
        const feedback: FeedbackInterface = formData;
        firebase.db
            .collection("feedbacks")
            .doc(id)
            .update(feedback)
            .then(() => {
                // console.log("Document successfully updated!");
            })
            .catch((error: any) => {
                console.error("Error updating document: ", error);
            });
    }
}

type FeedbackInterface = {
    name: string;
    company: string;
    email: string;
    mobile: string;
    message: string;
    status: number;
}
</script>
