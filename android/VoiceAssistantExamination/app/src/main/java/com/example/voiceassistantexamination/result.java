package com.example.voiceassistantexamination;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class result extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view= inflater.inflate(R.layout.result, container, false);
        listdata  obj[]=new listdata[]{new listdata("exam3"),new listdata("exam2")};
        RecyclerView r=view.findViewById(R.id.resultlist);
        resultadapter adapter=new resultadapter(obj);
        r.setHasFixedSize(true);
        r.setLayoutManager(new LinearLayoutManager(getActivity().getApplicationContext()));
        r.setAdapter(adapter);
        return view;
    }
}
