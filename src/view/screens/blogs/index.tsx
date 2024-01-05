import React, { useState } from 'react';
import { ActivityIndicator, FlatList, TextInput, View } from 'react-native';

import { styles } from './styles';
import { TabScreenProps } from '../types';
import { AppText, AuthInput, Button, Container, } from '../../components';
import { useSelector } from 'react-redux';
import { FormattedMessage } from '../../../localisations/locale-formatter';
import { LocaleProvider } from '../../../localisations/locale-provider';
import firestore from '@react-native-firebase/firestore';
import { Colors, Constants, Layout } from '../../../globals';
import { Controller, useForm } from 'react-hook-form';


export const BlogsScreen = (props: TabScreenProps<'BlogsScreen'>) => {
    const { user } = useSelector(({ Homfford }: any) => Homfford.auth);
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            newPostTitle: '',
            newPostContent: '',
        }
    });

    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogPosts = async () => {
        try {
            setLoading(true)
            const postsSnapshot = await firestore().collection('blogPosts').get();
            const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setBlogPosts(postsData);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false)
        }
    };

    const createBlogPost = async (data) => {
        try {
            await firestore().collection('blogPosts').add({
                title: data?.newPostTitle?.trim(),
                content: data?.newPostContent?.trim(),
                userId: user?.uid,
                createdAt: new Date(),
            });

            // Refresh the list of blog posts
            fetchBlogPosts();
        } catch (error) {
            console.error('Error creating blog post:', error);
        }
    };

    const updateBlogPost = async (postId, updatedTitle, updatedContent) => {
        try {
            await firestore().collection('blogPosts').doc(postId).update({
                title: updatedTitle,
                content: updatedContent,
            });

            // Refresh the list of blog posts
            fetchBlogPosts();
        } catch (error) {
            console.error('Error updating blog post:', error);
        }
    };

    const deleteBlogPost = async (postId) => {
        try {
            await firestore().collection('blogPosts').doc(postId).delete();

            // Refresh the list of blog posts
            fetchBlogPosts();
        } catch (error) {
            console.error('Error deleting blog post:', error);
        }
    };

    const renderItem = ({ item }) => {
        const [updatedTitle, setUpdatedTitle] = useState("")
        const [updatedContent, setUpdatedContent] = useState("")
        return (
            <View>
                <AppText>{`Title: ${item.title}`}</AppText>
                <AppText>{`Content: ${item.content}`}</AppText>
                {user && user.uid === item.userId && (
                    <View>
                        <TextInput
                            placeholder="Updated Title"
                            value={item?.updatedTitle || ''}
                            onChangeText={setUpdatedTitle}
                        />
                        <TextInput
                            placeholder="Updated Content"
                            value={item?.updatedContent || ''}
                            onChangeText={setUpdatedContent}
                        />
                        <Button
                            buttonLable={"Update"}
                            onPress={() => updateBlogPost(item?.id, updatedTitle, updatedContent)}
                            buttonContainer={{ margin: Layout.zero, marginTop: Layout.heightPercentageToDP(10), backgroundColor: Colors.brand['DEFAULT'] }}
                            btnLabelStyles={{ color: Colors.white }}
                        />
                        <Button
                            buttonLable={"Delete"}
                            onPress={() => deleteBlogPost(item?.id)}
                            buttonContainer={{ margin: Layout.zero, marginTop: Layout.heightPercentageToDP(10), backgroundColor: Colors.brand['DEFAULT'] }}
                            btnLabelStyles={{ color: Colors.white }}
                        />
                    </View>
                )}
            </View>
        )
    }

    return (
        <Container >
            <View style={styles.container}>
                <View style={styles.screenContent} >
                    <Controller
                        control={control}
                        rules={{
                            pattern: Constants.REGEX_FULL_NAME,
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <AuthInput
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                isError={errors?.newPostTitle}
                                placeholder={"Enter title"}
                            />
                        )}
                        name="newPostTitle"
                    />
                    {errors?.newPostTitle && <AppText style={styles.error} >
                        <FormattedMessage id={LocaleProvider.IDs.error.ageIsInvalid} />
                    </AppText>}

                    <Controller
                        control={control}
                        rules={{
                            pattern: Constants.REGEX_FULL_NAME,
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <AuthInput
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                isError={errors?.newPostContent}
                                placeholder={"Enter content"}
                            />
                        )}
                        name="newPostContent"
                    />
                    {errors?.newPostContent && <AppText style={styles.error} >
                        <FormattedMessage id={LocaleProvider.IDs.error.ageIsInvalid} />
                    </AppText>}

                    <Button
                        buttonLable={LocaleProvider.formatMessage(LocaleProvider.IDs.label.submit)}
                        onPress={handleSubmit(createBlogPost)}
                        buttonContainer={{ margin: Layout.zero, marginTop: Layout.heightPercentageToDP(10), backgroundColor: Colors.brand['DEFAULT'] }}
                        btnLabelStyles={{ color: Colors.white }}
                    />

                    {/* List of blog posts */}
                    {
                        loading ? <ActivityIndicator /> : <FlatList
                            data={blogPosts}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    }

                </View>
            </View>
        </Container>
    );
};
