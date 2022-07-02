package com.example.voiceassistantexamination;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import androidx.annotation.Nullable;

public class helper extends SQLiteOpenHelper {
    public helper(@Nullable Context context) {
        super(context, "Info", null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
                sqLiteDatabase.execSQL("create table if not exists details(regno text,blind text,section text,year text,department text)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
    public boolean isexist(){
        SQLiteDatabase db=getReadableDatabase();
        Cursor c=db.rawQuery("Select * from details", null);
        if(c.moveToFirst()){
            return true;
        }
        return false;
    }
    public void adduser(String regno,String blind,String section,String year,String department){
        SQLiteDatabase db=getWritableDatabase();
        ContentValues c=new ContentValues();
        c.put("regno",regno);
        c.put("blind",blind);
        c.put("section",section);
        c.put("year",year);
        c.put("department",department);
        db.insert("details",null,c);
    }
    public void deleteuser(){
        SQLiteDatabase db=getWritableDatabase();
        SQLiteDatabase db2=getReadableDatabase();
        Cursor c= db2.rawQuery("Select * from details", null);
        if(c.moveToFirst()) {

            db.delete("details", "regno='"+c.getString(0)+"'", null);
        }

    }
    public String getuserno(){
        SQLiteDatabase db=getReadableDatabase();
        Cursor c=db.rawQuery("select * from details", null);
        if(c.moveToFirst()){
            return c.getString(0);
        }
        return "";
    }
}
