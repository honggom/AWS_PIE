package kr.or.bit.util;       

import com.github.scribejava.core.builder.api.DefaultApi20;       

/*
파일명: NaverLoginApi.java
설명: 네이버 로그인 API
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

public class NaverLoginApi extends DefaultApi20{

    
    protected NaverLoginApi(){
    }

    private static class InstanceHolder{
        private static final NaverLoginApi INSTANCE = new NaverLoginApi();
    }

    public static NaverLoginApi instance(){
        return InstanceHolder.INSTANCE;
    }
    
    @Override
    public String getAccessTokenEndpoint() {
        return "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code";

    }

    @Override
    protected String getAuthorizationBaseUrl() {
        // TODO Auto-generated method stub
        return"https://nid.naver.com/oauth2.0/authorize";
    }

}